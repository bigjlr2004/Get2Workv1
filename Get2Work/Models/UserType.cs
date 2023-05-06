namespace Get2Work.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public static int MANAGER_ID => 1;
        public static int EMPLOYEE_ID => 2;
    }
}
