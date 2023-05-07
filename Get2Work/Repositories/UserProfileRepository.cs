using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Get2Work.Models;
using Microsoft.Data.SqlClient;
using Get2Work.Utils;


namespace Get2Work.Repositories
{
    public class UserProfileRepository : BaseRepository,  IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName,  up.FirstName, up.LastName, up.PhoneNumber,
                            up.Email, up.UserTypeId, up.ActiveStatus,  ut.Name AS UserTypeName
                          FROM UserProfile up
                                LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                          WHERE FirebaseUserId = @FirebaseUserId";
                    
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ActiveStatus = DbUtils.GetBool(reader, "ActiveStatus"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }
        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName,
                            up.Email,up.UserTypeId, up.ActiveStatus
                          FROM UserProfile up
                        ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(NewUserProfilefromReader(reader));
                        }

                        return users;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName,
                            up.Email, up.UserTypeId, up.ActiveStatus
                          FROM UserProfile up
                          WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserProfilefromReader(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (DisplayName, FirstName, LastName, Email, ActiveStatus, UserTypeId, FirebaseUserId )
                        OUTPUT INSERTED.ID
                        VALUES (@DisplayName, @FirstName, @LastName, @Email, @ActiveStatus, @UserTypeId, @FirebaseUserId)";

                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@ActiveStatus", user.ActiveStatus);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                Update UserProfile
                                SET FirstName = @FirstName,
                                    LastName = @LastName,
                                    DisplayName = @DisplayName,
                                    Email = @Email,
                                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                   
                  
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void ChangeActivation(UserProfile userProfile, bool activated)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         Update UserProfile
                                SET FirstName = @FirstName,
                                    LastName = @LastName,
                                    DisplayName = @DisplayName,
                                    Email = @Email,
                                    ActiveStatus= @ActiveStatus
                                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    cmd.Parameters.AddWithValue("@ActiveStatus", activated);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    
        private UserProfile NewUserProfilefromReader (SqlDataReader reader)
        {
           return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus"))


            };
        }

    }
            }
