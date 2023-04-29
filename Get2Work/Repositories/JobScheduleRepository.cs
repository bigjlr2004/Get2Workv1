﻿using Get2Work.Models;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

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
                            s.id, s.Name, s.PhoneNumber, s.Address, s.ActiveStatus
                            FROM JobSchedule js                    
                            Join Job j on js.JobId = j.Id
                            JOIN UserProfile up on j.UserProfileId = up.Id
                            JOIN Store s on s.Id = j.StoreId
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
        private JobSchedule NewJobSchedulefromReader(SqlDataReader reader)
        {
            return new JobSchedule()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Date = DbUtils.GetDateTime(reader, "Date"),
                DayId = DbUtils.GetInt(reader, "DayId"),
                TimeIn = DbUtils.GetNullableDateTime(reader, "TimeIn"),
                TimeOut = DbUtils.GetNullableDateTime(reader, "TimeOut"),
                StartingOdometer = DbUtils.GetNullableInt(reader, "StartingOdometer"),
                EndingOdometer = DbUtils.GetNullableInt(reader, "EndingOdometer"),
                Halfs = DbUtils.GetInt(reader, "Halfs"),
                Pints = DbUtils.GetInt(reader, "Pints"),
                Snacks = DbUtils.GetInt(reader, "Snacks"),
                Notes = DbUtils.GetString(reader, "Notes"),
                Complete = reader.GetBoolean(reader.GetOrdinal("Complete")),
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
        }
    }
}
