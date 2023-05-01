using Get2Work.Models;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Numerics;

namespace Get2Work.Repositories
{
    public class JobScheduleRepository : BaseRepository, IJobScheduleRepository
    {
        public JobScheduleRepository(IConfiguration configuration) : base(configuration) { }

        public List<JobSchedule> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT  js.Id as JobScheduleId, js.Date, js.JobId, js.DayId, js.Notes, js.TimeIn, 
                            js.TimeOut, js.StartingOdometer,js.EndingOdometer, js.Halfs, js.Pints, 
                            js.Snacks, js.Complete,j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                            j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                            up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, 
                            up.FirstName, up.LastName,up.Email, up.Notes, up.HireDate, 
                            up.UserTypeId, up.ActiveStatus, up.Address,
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                            d.Name as DayName
                            FROM JobSchedule js                    
                            Join Job j on js.JobId = j.Id
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
                            JOIN Day d on d.Id = js.DayId
                        ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var users = new List<JobSchedule>();
                        while (reader.Read())
                        {
                            users.Add(NewJobSchedulefromReader(reader));
                        }

                        return users;
                    }
                }
            }
        }
        public List<JobSchedule> GetAllJobScheduleByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT  js.Id as JobScheduleId, js.Date, js.JobId, js.DayId, js.Notes, js.TimeIn, 
                            js.TimeOut, js.StartingOdometer,js.EndingOdometer, js.Halfs, js.Pints, 
                            js.Snacks, js.Complete,j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                            j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                            up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, 
                            up.FirstName, up.LastName,up.Email, up.Notes, up.HireDate, 
                            up.UserTypeId, up.ActiveStatus, up.Address,
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                            d.Name as DayName
                            FROM JobSchedule js                    
                            Join Job j on js.JobId = j.Id
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
                            JOIN Day d on d.Id = js.DayId
                            WHERE up.Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", userId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var jobs = new List<JobSchedule>();
                        while (reader.Read())
                        {
                            jobs.Add(NewJobSchedulefromReader(reader));
                        }

                        return jobs;
                    }
                }
            }
        }

        public void Add(JobSchedule newJob)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO JobSchedule (Date, JobId, DayId, TimeIn, TimeOut, StartingOdometer, EndingOdometer, Notes, Halfs, Pints, Snacks, Complete)
                         OUTPUT INSERTED.ID 
                        VALUES (@Date, @JobId, @DayId, @TimeIn, @TimeOut, @StartingOdometer, @EndingOdometer, @Notes, @Halfs, @Pints, @Snacks, @Complete)";

                    DbUtils.AddParameter(cmd, "@Date", newJob.Date);
                    DbUtils.AddParameter(cmd, "@JobId", newJob.JobId);
                    DbUtils.AddParameter(cmd, "@TimeIn", newJob.TimeIn);
                    DbUtils.AddParameter(cmd, "@TimeOut", newJob.TimeOut);
                    DbUtils.AddParameter(cmd, "@DayId", newJob.DayId);
                    DbUtils.AddParameter(cmd, "@StartingOdometer", newJob.StartingOdometer);
                    DbUtils.AddParameter(cmd, "@EndingOdometer", newJob.EndingOdometer);
                    DbUtils.AddParameter(cmd, "@Notes", newJob.Notes);
                    DbUtils.AddParameter(cmd, "@Halfs", newJob.Halfs);
                    DbUtils.AddParameter(cmd, "@Pints", newJob.Pints);
                    DbUtils.AddParameter(cmd, "@Snacks", newJob.Snacks);
                    DbUtils.AddParameter(cmd, "@Complete", newJob.Complete);

                    newJob.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public JobSchedule GetJobScheduleById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT  js.Id as JobScheduleId, js.Date, js.JobId, js.DayId, js.Notes, js.TimeIn, 
                            js.TimeOut, js.StartingOdometer,js.EndingOdometer, js.Halfs, js.Pints, 
                            js.Snacks, js.Complete,j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                            j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                            up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, 
                            up.FirstName, up.LastName,up.Email, up.Notes, up.HireDate, 
                            up.UserTypeId, up.ActiveStatus, up.Address,
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                            d.Name as DayName
                            FROM JobSchedule js                    
                            Join Job j on js.JobId = j.Id
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
                            JOIN Day d on d.Id = js.DayId
                            WHERE js.Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                   JobSchedule jobSchedule = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        jobSchedule = NewJobSchedulefromReader(reader);
                    }
                    reader.Close();

                    return jobSchedule;
                }
            }
        }
        public void Update(JobSchedule job)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Update JobSchedule
                            SET Date = @Date,
                            JobId = @JobId,
                            TimeIn = @TimeIn,
                            TimeOut = @TimeOut,
                            DayId = @DayId,
                            StartingOdometer = @StartingOdometer,
                            EndingOdometer = @EndingOdometer,
                            Notes = @Notes,
                            Halfs = @Halfs,
                            Pints = @Pints,
                            Snacks = @Snacks,
                            Complete = @Complete
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", job.Id);
                    DbUtils.AddParameter(cmd, "@Date", job.Date);
                    DbUtils.AddParameter(cmd, "@JobId", job.JobId);
                    DbUtils.AddParameter(cmd, "@TimeIn", job.TimeIn);
                    DbUtils.AddParameter(cmd, "@TimeOut", job.TimeOut);
                    DbUtils.AddParameter(cmd, "@DayId", job.DayId);
                    DbUtils.AddParameter(cmd, "@StartingOdometer", job.StartingOdometer);
                    DbUtils.AddParameter(cmd, "@EndingOdometer", job.EndingOdometer);
                    DbUtils.AddParameter(cmd, "@Notes", job.Notes);
                    DbUtils.AddParameter(cmd, "@Halfs", job.Halfs);
                    DbUtils.AddParameter(cmd, "@Pints", job.Pints);
                    DbUtils.AddParameter(cmd, "@Snacks", job.Snacks);
                    DbUtils.AddParameter(cmd, "@Complete", job.Complete);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddNew(Schedule newJob)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO JobSchedule (Date, JobId, DayId)
                         OUTPUT INSERTED.ID 
                        VALUES (@Date, @JobId, @DayId)";

                    DbUtils.AddParameter(cmd, "@Date", newJob.Date);
                    DbUtils.AddParameter(cmd, "@JobId", newJob.JobId);
                    DbUtils.AddParameter(cmd, "@DayId", newJob.DayId);


                    newJob.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteFutureJobSchedule(int JobId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    DateTime today = DateTime.Now;
                    cmd.CommandText = @"
                        DELETE JobSchedule
                        WHERE JobId = @jobId AND Date > @today
                    ";

                    cmd.Parameters.AddWithValue("@jobId", JobId);
                    cmd.Parameters.AddWithValue("@today", today);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public List<JobSchedule> SingleDate(DateTime PreviousDay, DateTime NextDay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
                      SELECT  js.Id as JobScheduleId, js.Date, js.JobId, js.DayId, js.Notes, js.TimeIn, 
                            js.TimeOut, js.StartingOdometer,js.EndingOdometer, js.Halfs, js.Pints, 
                            js.Snacks, js.Complete,j.Id, j.UserProfileId, j.Description, j.CreateDateTime, 
                            j.ScheduledTime, j.StoreId, j.Notes, j.ActiveStatus,
                            up.Id as ProfileId, up.FirebaseUserId, up.DisplayName AS UserProfileName, 
                            up.FirstName, up.LastName,up.Email, up.Notes, up.HireDate, 
                            up.UserTypeId, up.ActiveStatus, up.Address,
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus,
                            d.Name as DayName
                            FROM JobSchedule js                    
                            Join Job j on js.JobId = j.Id
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
                            JOIN Day d on d.Id = js.DayId
                        WHERE js.Date > @PreviousDay AND js.Date < @NextDay";

                    cmd.Parameters.AddWithValue("@PreviousDay", PreviousDay);
                    cmd.Parameters.AddWithValue("@NextDay", NextDay);
                    cmd.CommandText = sql;


                           
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var jobs = new List<JobSchedule>();
                        while (reader.Read())
                            {
                                jobs.Add(NewJobSchedulefromReader(reader));
                            }

                        
                            return jobs;
                    }
                }
            }
        }
        private JobSchedule NewJobSchedulefromReader(SqlDataReader reader)
        {
            var jobSchedule = new JobSchedule()
            {
                Id = DbUtils.GetInt(reader, "JobScheduleId"),
                Date = DbUtils.GetDateTime(reader, "Date"),
                DayId = DbUtils.GetInt(reader, "DayId"),

                Day = new Day()
                {
                    Id = DbUtils.GetInt(reader, "DayId"),
                    Name = DbUtils.GetString(reader, "DayName")
                },

                TimeIn = DbUtils.GetNullableDateTime(reader, "TimeIn"),
                TimeOut = DbUtils.GetNullableDateTime(reader, "TimeOut"),
                StartingOdometer = DbUtils.GetNullableInt(reader, "StartingOdometer"),
                EndingOdometer = DbUtils.GetNullableInt(reader, "EndingOdometer"),
                Halfs = DbUtils.GetNullableInt(reader, "Halfs"),
                Pints = DbUtils.GetNullableInt(reader, "Pints"),
                Snacks = DbUtils.GetNullableInt(reader, "Snacks"),
                Notes = DbUtils.GetString(reader, "Notes"),
                JobId = DbUtils.GetInt(reader, "JobId"),

                Job = new Job()
                {
                    Id = DbUtils.GetInt(reader, "JobId"),
                    Description = DbUtils.GetString(reader, "Description"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ScheduledTime = DbUtils.GetDateTime(reader, "ScheduledTime"),
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
    

