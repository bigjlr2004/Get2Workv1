using Get2Work.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using static Azure.Core.HttpHeader;
using Microsoft.AspNetCore.Mvc;

namespace Get2Work.Repositories
{
    public class JobRepository : BaseRepository, IJobRepository
    {
        public JobRepository(IConfiguration configuration) : base(configuration) { }

        public List<Job> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName,
                    up.Email, up.Notes, up.HireDate, up.UserTypeId, up.ActiveStatus, up.Address,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId";

                    var reader = cmd.ExecuteReader();
                    

                        var jobs = new List<Job>();
                        while (reader.Read())
                        {
                            jobs.Add(NewJobfromReader(reader));
                        }
                        return jobs;
                };
                
            }
        }
        public Job GetJobById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName,
                    up.Email, up.Notes, up.HireDate, up.UserTypeId, up.ActiveStatus, up.Address,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    WHERE j.Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    Job job = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        job = NewJobfromReader(reader);
                    }
                    reader.Close();

                    return job;
                }
            }
        }

        public List<Job> GetJobsByUserId(int userId) 
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName,
                    up.Email, up.Notes, up.HireDate, up.UserTypeId, up.ActiveStatus, up.Address,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                        WHERE j.UserProfileId = @id";

                        cmd.Parameters.AddWithValue("@id", userId);

                    var reader = cmd.ExecuteReader();


                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        jobs.Add(NewJobfromReader(reader));
                    }
                    return jobs;
                };

            }
        }
        public int Add(Job job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Job (UserProfileId, Description, CreateDateTime, ScheduledTime, StoreId, Notes, ActiveStatus)
                         OUTPUT INSERTED.ID 
                        VALUES (@UserProfileId, @Description, @CreateDateTime, @ScheduledTime, @StoreId, @Notes, @ActiveStatus)";

                    DbUtils.AddParameter(cmd, "@UserProfileId", job.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Description", job.Description);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", job.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ScheduledTime", job.ScheduledTime);
                    DbUtils.AddParameter(cmd, "@StoreId", job.StoreId);
                    DbUtils.AddParameter(cmd, "@Notes", job.Notes);
                    DbUtils.AddParameter(cmd, "@ActiveStatus", job.ActiveStatus);

                    job.Id = (int)cmd.ExecuteScalar();
                }
                return job.Id;
            }
        }
        public void Update(Job job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Update Job
                            SET UserProfileId = @UserProfileId,
                                Description = @Description,
                                CreateDateTime = @CreateDateTime,
                                ScheduledTime = @ScheduledTime,
                                StoreId = @StoreId,
                                Notes = @Notes,
                                ActiveStatus = @ActiveStatus
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", job.Id);
                    DbUtils.AddParameter(cmd, "@UserProfileId", job.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Description", job.Description);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", job.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ScheduledTime", job.ScheduledTime);
                    DbUtils.AddParameter(cmd, "@StoreId", job.StoreId);
                    DbUtils.AddParameter(cmd, "@Notes",  job.Notes);
                    DbUtils.AddParameter(cmd, "@ActiveStatus", job.ActiveStatus);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Job NewJobfromReader(SqlDataReader reader)
        {
            return new Job()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Description = DbUtils.GetString(reader, "Description"),
                CreateDateTime = DbUtils.GetString(reader, "CreateDateTime"),
                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                Notes = DbUtils.GetString(reader, "Notes"),
                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "ProfileId"),
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
                },
                StoreId = DbUtils.GetInt(reader, "StoreId"),

                Store = new Store()
                {
                    Id = DbUtils.GetInt(reader, "StoreId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                    Address = DbUtils.GetString(reader, "Address"),
                    ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                }

            };
        }
    }
}
