using Get2Work.Models;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public class DayRepository : BaseRepository, IDayRepository
    {
        public DayRepository(IConfiguration configuration) : base(configuration) { }

        public List<Day> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name 
                            FROM Day";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var Days = new List<Day>();
                        while (reader.Read())
                        {
                            Day Day = new Day()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                            Days.Add(Day);
                        }
                        return Days;
                    }
                }
            }
        }
        public Day GetDayById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name 
                            FROM Day
                            WHERE Id=@id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    Day day = null;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                       
                        if (reader.Read())
                        {
                            day = new Day()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                       
                        }
                        return day;
                    }
                }
           }
        }
    }
}
