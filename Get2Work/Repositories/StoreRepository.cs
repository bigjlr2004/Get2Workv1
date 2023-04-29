using Get2Work.Models;
using Get2Work.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public class StoreRepository : BaseRepository, IStoreRepository
    {
        public StoreRepository(IConfiguration configuration) : base(configuration) { }

        public List<Store> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name, PhoneNumber, Address, ActiveStatus
                            FROM Store";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var stores = new List<Store>();
                        while(reader.Read())
                            {
                                stores.Add(NewStorefromReader(reader));
                            }
                             return stores;
                    }
                }
            }
        }

        public Store GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, Name, PhoneNumber, Address, ActiveStatus
                            FROM Store
                          WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    Store Store = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Store = NewStorefromReader(reader);
                    }
                    reader.Close();

                    return Store;
                }
            }
        }
        public void Add(Store Store)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Store (Name, PhoneNumber, Address, ActiveStatus)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @PhoneNumber, @Address, @ActiveStatus)";

                    DbUtils.AddParameter(cmd, "@Name", Store.Name);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", Store.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@Address", Store.Address);
                    DbUtils.AddParameter(cmd, "@ActiveStatus", Store.ActiveStatus);
                    Store.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Store Store)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                Update Store
                                SET Name = @Name,
                                    PhoneNumber = @PhoneNumber,
                                    Address =@Address,
                                    ActiveStatus = @ActiveStatus
                                WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", Store.Id);
                    DbUtils.AddParameter(cmd, "@Name", Store.Name);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", Store.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@Address", Store.Address);
                    DbUtils.AddParameter(cmd, "@ActiveStatus", Store.ActiveStatus);


                    cmd.ExecuteNonQuery();
                }
            }
        }
        private Store NewStorefromReader(SqlDataReader reader)
        {
            return new Store()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                Address = DbUtils.GetString(reader, "Address"),
                ActiveStatus = reader.GetBoolean(reader.GetOrdinal("ActiveStatus"))
            };
        }
    }
}
