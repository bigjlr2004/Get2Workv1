using Get2Work.Models;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Intrinsics.X86;
using System.Security.Policy;

namespace Get2Work.Repositories
{
    public class CompletedJobRepository : BaseRepository, ICompletedJobRepository
    {
        public CompletedJobRepository(IConfiguration configuration) : base(configuration) { }

        public List<CompletedJob> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                   SELECT  cj.Id as CompletedJobId, cj.DateCompleted, cj.JobScheduleId, cj.Notes, cj.TimeIn, 
                            cj.TimeOut, cj.StartingOdometer,cj.EndingOdometer, cj.Halfs, cj.Pints, 
                            cj.Snacks, cj.Complete,j.Id as JobId, j.UserProfileId, j.Description, j.CreateDateTime, 
                            j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                            up.Id as ProfileId, up.FirebaseUserId, 
                            up.FirstName, up.LastName,up.Email,  
                            up.UserTypeId, up.ActiveStatus, 
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                           
                            FROM CompletedJob cj                    
                            Join JobSchedule js on js.Id = cj.JobScheduleId
                            Join Job j on j.Id = js.JobId
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
                            JOIN Day d on d.Id = js.DayId
                        ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var completedJobs = new List<CompletedJob>();
                        while (reader.Read())
                        {
                            completedJobs.Add(NewCompletedJobfromReader(reader));
                        }

                        return completedJobs;
                    }
                }
            }
        }

        public List<CompletedJob> GetTodaysCompletedJobsAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT
                                      cj.Id as CompletedJobId, cj.DateCompleted, cj.JobScheduleId, cj.Notes, 
                                      CONVERT(datetimeoffset, cj.DateCompleted) AT TIME ZONE 'Central Standard Time' AS DateCompleted,
                                      CONVERT(datetimeoffset, cj.TimeIn) AT TIME ZONE 'Central Standard Time' AS TimeIn,
                                      CONVERT(datetimeoffset, cj.TimeOut) AT TIME ZONE 'Central Standard Time' AS TimeOut,
                                      cj.StartingOdometer,cj.EndingOdometer, cj.Halfs, cj.Pints, 
                                      cj.Snacks, cj.Complete,j.Id as JobId, j.UserProfileId, j.Description, j.CreateDateTime, 
                                      j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                                      up.Id as ProfileId, up.FirebaseUserId, 
                                      up.FirstName, up.LastName,up.Email,  
                                      up.UserTypeId, up.ActiveStatus, 
                                      s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus

                                      FROM CompletedJob cj                    
                                      Join JobSchedule js on js.Id = cj.JobScheduleId
                                      Join Job j on j.Id = js.JobId
                                      JOIN UserProfile up on j.UserProfileId = up.Id
                                      JOIN Store s on s.Id = j.StoreId
                                      JOIN Day d on d.Id = js.DayId
                                      WHERE CONVERT(DATE, DateCompleted) = CONVERT(DATE, SYSDATETIME()) AND j.ActiveStatus = 1

                                  ";



                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var completedJobs = new List<CompletedJob>();
                        while (reader.Read())
                        {
                            completedJobs.Add(NewCompletedJobfromReader(reader));
                        }

                        return completedJobs;
                    }
                }
            }
        }
        public List<CompletedJob> GetTodaysCompletedJobsByUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                   SELECT  cj.Id as CompletedJobId, cj.JobScheduleId, cj.Notes,
                                                        
                             CONVERT(datetimeoffset, cj.DateCompleted) AT TIME ZONE 'Central Standard Time' AS DateCompleted,
                             CONVERT(datetimeoffset, cj.TimeIn) AT TIME ZONE 'Central Standard Time' AS TimeIn,
                             CONVERT(datetimeoffset, cj.TimeOut) AT TIME ZONE 'Central Standard Time' AS TimeOut,

                            cj.StartingOdometer,cj.EndingOdometer, cj.Halfs, cj.Pints, 
                            cj.Snacks, cj.Complete,j.Id as JobId, j.UserProfileId, j.Description, j.CreateDateTime, 
                            j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                            up.Id as ProfileId, up.FirebaseUserId,  
                            up.FirstName, up.LastName,up.Email,  
                            up.UserTypeId, up.ActiveStatus, 
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                           
                            FROM CompletedJob cj                    
                            Join JobSchedule js on js.Id = cj.JobScheduleId
                            Join Job j on j.Id = js.JobId
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
                            JOIN Day d on d.Id = js.DayId
                            WHERE CONVERT(DATE, DateCompleted) =  CONVERT(DATE, SYSDATETIME()) AND up.FireBaseUserId = @FirebaseUserId AND j.ActiveStatus = 1;
                        ";
                            DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var completedJobs = new List<CompletedJob>();
                        while (reader.Read())
                        {
                            completedJobs.Add(NewCompletedJobfromReader(reader));
                        }

                        return completedJobs;
                    }
                }
            }
        }
        


        public void Add(CompletedJob job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO CompletedJob (DateCompleted, JobScheduleId,  TimeIn, TimeOut, StartingOdometer, EndingOdometer, Notes, Halfs, Pints, Snacks, Complete)
                         OUTPUT INSERTED.ID 
                        VALUES (@DateCompleted, @JobScheduleId, @TimeIn, @TimeOut, @StartingOdometer, @EndingOdometer, @Notes, @Halfs, @Pints, @Snacks, @Complete)";

                    DbUtils.AddParameter(cmd, "@DateCompleted", job.DateCompleted);
                    DbUtils.AddParameter(cmd, "@JobScheduleId", job.JobScheduleId);
                    DbUtils.AddParameter(cmd, "@TimeIn", job.TimeIn);
                    DbUtils.AddParameter(cmd, "@TimeOut", job.TimeOut);
                    DbUtils.AddParameter(cmd, "@StartingOdometer", job.StartingOdometer);
                    DbUtils.AddParameter(cmd, "@EndingOdometer", job.EndingOdometer);
                    DbUtils.AddParameter(cmd, "@Notes", job.Notes);
                    DbUtils.AddParameter(cmd, "@Halfs", job.Halfs);
                    DbUtils.AddParameter(cmd, "@Pints", job.Pints);
                    DbUtils.AddParameter(cmd, "@Snacks", job.Snacks);
                    DbUtils.AddParameter(cmd, "@Complete", job.Complete);

                    job.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        
        private CompletedJob NewCompletedJobfromReader(SqlDataReader reader)
        {
            var jobSchedule = new CompletedJob()
            {
                Id = DbUtils.GetInt(reader, "CompletedJobId"),
                DateCompleted = DbUtils.GetDateTimeOffSet(reader, "DateCompleted"),
                TimeIn = DbUtils.GetDateTimeOffSet(reader, "TimeIn"),
                TimeOut = DbUtils.GetDateTimeOffSet(reader, "TimeOut"),
                StartingOdometer = DbUtils.GetNullableInt(reader, "StartingOdometer"),
                EndingOdometer = DbUtils.GetNullableInt(reader, "EndingOdometer"),
                Halfs = DbUtils.GetNullableInt(reader, "Halfs"),
                Pints = DbUtils.GetNullableInt(reader, "Pints"),
                Snacks = DbUtils.GetNullableInt(reader, "Snacks"),
                Notes = DbUtils.GetString(reader, "Notes"),
                JobScheduleId = DbUtils.GetInt(reader, "JobScheduleId"),

                Job = new Job()
                {
                    Id = DbUtils.GetInt(reader, "JobId"),
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
                }
            };

            if (DbUtils.IsNotDbNull(reader, "Complete"))
            {
                jobSchedule.Complete = reader.GetBoolean(reader.GetOrdinal("Complete"));

            }
            return jobSchedule;
        }

    }

}


