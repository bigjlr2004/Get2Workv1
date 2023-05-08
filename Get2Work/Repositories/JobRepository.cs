using Get2Work.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using static Azure.Core.HttpHeader;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Xml.Linq;
using System;
using System.Reflection.PortableExecutable;

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
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName,  up.FirstName, up.LastName, up.PhoneNumber,
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                    d.Id as DayId,d.Name as WeekDay,
                    js.id as JobScheduleId
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    JOIN JobSchedule js on js.jobId = j.Id
                    JOIN Day d on js.DayId = d.Id";
                   
                    
                    var reader = cmd.ExecuteReader();
                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        var jobId = DbUtils.GetInt(reader, "Id");
                        var existingjob = jobs.FirstOrDefault(p => p.Id == jobId);
                        if (existingjob == null)
                        {
                            existingjob = new Job()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Description = DbUtils.GetString(reader, "Description"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
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
                                },
                                Days = new List<Day>()
                            };
                            jobs.Add(existingjob);
                        }
                        if (DbUtils.IsNotDbNull(reader, "WeekDay"))
                        {
                            existingjob.Days.Add(new Day()
                            {
                                Id = DbUtils.GetInt(reader, "DayId"),
                                Name = DbUtils.GetString(reader, "WeekDay"),

                            });
                        }

                    }
                    return jobs;
                }

            }
        }
        public List<Job> GetAllJobsScheduledToday()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName, up.PhoneNumber,
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                    d.Id as DayId,d.Name as WeekDay,
                    js.id as JobScheduleId
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    JOIN JobSchedule js on js.jobId = j.Id
                    JOIN Day d on js.DayId = d.Id
                    WHERE d.Name = @Day AND j.ActiveStatus = 1
                     ORDER BY CAST(j.scheduledTime as TIME)
                        ";

                    DateTime today = DateTime.Now;
                    //Get the current day weekday string
                    DayOfWeek dayOfWeek = today.DayOfWeek;
                    string day = dayOfWeek.ToString();

                    DbUtils.AddParameter(cmd, "@Day", day);



                    var reader = cmd.ExecuteReader();



                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        var jobId = DbUtils.GetInt(reader, "Id");
                        var existingjob = jobs.FirstOrDefault(p => p.Id == jobId);
                        if (existingjob == null)
                        {
                            existingjob = new Job()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Description = DbUtils.GetString(reader, "Description"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                JobScheduleId = DbUtils.GetInt(reader, "JobScheduleId"),
                                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "UserProfileName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    PhoneNumber = DbUtils.GetString(reader,"PhoneNumber"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
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
                                },
                                    Days = new List<Day>()
                            };
                                    jobs.Add(existingjob);
                        }
                                    if (DbUtils.IsNotDbNull(reader, "WeekDay"))
                                        {
                                            existingjob.Days.Add(new Day()
                                            {
                                                Id = DbUtils.GetInt(reader, "DayId"),
                                                Name = DbUtils.GetString(reader, "WeekDay"),
                                    
                                            });
                                    }
                            
                    }
                            return jobs;
                }
                
            }
        }
        public List<Job> GetAllJobsSpecificDay(string day)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, up.FirstName, up.LastName, up.PhoneNumber,
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                    d.Id as DayId,d.Name as WeekDay,
                    js.id as JobScheduleId
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    JOIN JobSchedule js on js.jobId = j.Id
                    JOIN Day d on js.DayId = d.Id
                    WHERE d.Name = @Day AND j.ActiveStatus = 1
                     ORDER BY CAST(j.scheduledTime as TIME)
                        ";

                    

                    DbUtils.AddParameter(cmd, "@Day", day);



                    var reader = cmd.ExecuteReader();



                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        var jobId = DbUtils.GetInt(reader, "Id");
                        var existingjob = jobs.FirstOrDefault(p => p.Id == jobId);
                        if (existingjob == null)
                        {
                            existingjob = new Job()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Description = DbUtils.GetString(reader, "Description"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                JobScheduleId = DbUtils.GetInt(reader, "JobScheduleId"),
                                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "UserProfileName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
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
                                },
                                Days = new List<Day>()

                            };
                            jobs.Add(existingjob);
                        }
                        if (DbUtils.IsNotDbNull(reader, "WeekDay"))
                        {
                            existingjob.Days.Add(new Day()
                            {
                                Id = DbUtils.GetInt(reader, "DayId"),
                                Name = DbUtils.GetString(reader, "WeekDay"),

                            });
                        }

                    }
                    return jobs;
                }

            }
        }
        public List<Job> GetAllJobsScheduledTodayByUser(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName, up.PhoneNumber,
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                    d.Id as DayId,d.Name as WeekDay,
                    js.Id as JobScheduleId
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    JOIN JobSchedule js on js.jobId = j.Id
                    JOIN Day d on js.DayId = d.Id
                    WHERE d.Name = @Day AND up.FireBaseUserId = @FirebaseUserId AND j.ActiveStatus = 1
                     ORDER BY CAST(j.scheduledTime as TIME)
                        ";
                            DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                        

                    DateTime today = DateTime.Now;
                    //Get the current day weekday string
                    DayOfWeek dayOfWeek = today.DayOfWeek;
                    string day = dayOfWeek.ToString();

                    DbUtils.AddParameter(cmd, "@Day", day);



                    var reader = cmd.ExecuteReader();



                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        var jobId = DbUtils.GetInt(reader, "Id");
                        var existingjob = jobs.FirstOrDefault(p => p.Id == jobId);
                        if (existingjob == null)
                        {
                            existingjob = new Job()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Description = DbUtils.GetString(reader, "Description"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                                JobScheduleId = DbUtils.GetInt(reader, "JobScheduleId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
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
                                },
                                Days = new List<Day>()
                            };
                            jobs.Add(existingjob);
                        }
                        if (DbUtils.IsNotDbNull(reader, "WeekDay"))
                        {
                            existingjob.Days.Add(new Day()
                            {
                                Id = DbUtils.GetInt(reader, "DayId"),
                                Name = DbUtils.GetString(reader, "WeekDay"),

                            });
                        }

                    }
                    return jobs;
                }

            }
        }
        public List<Job> GetAllJobsScheduledByUser(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                    j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName, up.PhoneNumber,
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                    d.Id as DayId,d.Name as WeekDay,
                    js.Id as JobScheduleId
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    JOIN JobSchedule js on js.jobId = j.Id
                    JOIN Day d on js.DayId = d.Id
                    WHERE up.FireBaseUserId = @FirebaseUserId AND j.ActiveStatus = 1
                    ORDER BY CAST(j.scheduledTime as TIME)
                        ";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);


                   



                    var reader = cmd.ExecuteReader();



                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        var jobId = DbUtils.GetInt(reader, "Id");
                        var existingjob = jobs.FirstOrDefault(p => p.Id == jobId);
                        if (existingjob == null)
                        {
                            existingjob = new Job()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Description = DbUtils.GetString(reader, "Description"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                                JobScheduleId = DbUtils.GetInt(reader, "JobScheduleId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
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
                                },
                                Days = new List<Day>()
                            };
                            jobs.Add(existingjob);
                        }
                        if (DbUtils.IsNotDbNull(reader, "WeekDay"))
                        {
                            existingjob.Days.Add(new Day()
                            {
                                Id = DbUtils.GetInt(reader, "DayId"),
                                Name = DbUtils.GetString(reader, "WeekDay"),

                            });
                        }

                    }
                    return jobs;
                }

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
                    up.Id as ProfileId, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName, up.PhoneNumber,
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                    d.Id as DayId,d.Name as WeekDay,
                    js.Id as JobScheduleId
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                    JOIN JobSchedule js on js.jobId = j.Id
                    JOIN Day d on js.DayId = d.Id
                    WHERE j.Id = @Id 
                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    Job job = null;

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        if (job == null)
                        {
                            job = NewJobfromReader(reader);

                            job.Days = new List<Day>();
                            job.DayIds = new List<int>();
                        }


                        if (DbUtils.IsNotDbNull(reader, "WeekDay"))
                        {
                            job.Days.Add(new Day()
                            {
                                Id = DbUtils.GetInt(reader, "DayId"),
                                Name = DbUtils.GetString(reader, "WeekDay"),

                            });
                            job.DayIds.Add(DbUtils.GetInt(reader, "DayId"));
                        }
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
                    up.Email, up.UserTypeId, up.ActiveStatus,
                    s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                    FROM Job j
                    JOIN UserProfile up on j.UserProfileId = up.Id
                    JOIN Store s on s.Id = j.StoreId
                        WHERE j.UserProfileId = @id AND j.ActiveStatus = 1
                         ORDER BY CAST(j.scheduledTime as TIME)";

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
                            SET ActiveStatus = @ActiveStatus
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", job.Id);
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
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                ScheduledTime = DbUtils.GetString(reader, "ScheduledTime"),
                Notes = DbUtils.GetString(reader, "Notes"),
                JobScheduleId = DbUtils.GetInt(reader, "JobScheduleId"),
                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus")),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "ProfileId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
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
