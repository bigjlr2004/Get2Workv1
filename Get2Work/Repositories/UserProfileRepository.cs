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
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName,
                            up.Email, up.Notes, up.HireDate,
                            up.UserTypeId, up.ActiveStatus, up.Address
                          FROM UserProfile up
                          WHERE FirebaseUserId = @FirebaseUserId";
                    
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
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
        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName,
                            up.Email, up.Notes, up.HireDate,
                            up.UserTypeId, up.ActiveStatus, up.Address
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
                         SELECT up.Id, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName,
                            up.Email, up.Notes, up.HireDate,
                            up.UserTypeId, up.ActiveStatus, up.Address
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
                        INSERT INTO UserProfile (DisplayName, FirstName, LastName, Email, HireDate, Notes, Address, ActiveStatus, UserTypeId, FirebaseUserId )
                        OUTPUT INSERTED.ID
                        VALUES (@DisplayName, @FirstName, @LastName, @Email, @HireDate, @Notes, @Address, @ActiveStatus, @UserTypeId, @FirebaseUserId)";

                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@HireDate", user.HireDate);
                    DbUtils.AddParameter(cmd, "@Notes", user.Notes);
                    DbUtils.AddParameter(cmd, "@Address", user.Address);
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
                                    HireDate = @HireDate,
                                    Notes = @Notes,
                                    Address =@Address
                                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@HireDate", user.HireDate);
                    DbUtils.AddParameter(cmd, "@Notes", user.Notes);
                    DbUtils.AddParameter(cmd, "@Address", user.Address);
                  
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
                                    HireDate = @HireDate,
                                    Notes = @Notes,
                                    Address =@Address,
                                    ActiveStatus= @ActiveStatus
                                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@HireDate", userProfile.HireDate);
                    DbUtils.AddParameter(cmd, "@Notes", userProfile.Notes);
                    DbUtils.AddParameter(cmd, "@Address", userProfile.Address);
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
                DisplayName = DbUtils.GetString(reader, "UserProfileName"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                HireDate = DbUtils.GetDateTime(reader, "HireDate"),
                Email = DbUtils.GetString(reader, "Email"),
                Notes = DbUtils.GetString(reader, "Notes"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                Address = DbUtils.GetString(reader, "Address"),
                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus"))


            };
        }

    }
            }
