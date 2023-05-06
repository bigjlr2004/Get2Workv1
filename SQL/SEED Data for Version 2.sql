INSERT INTO [UserType] ([Name]) VALUES ('Manager'), ('Employee')

INSERT INTO [UserProfile] ([FirebaseUserId], [DisplayName], [FirstName], [LastName], [Email], [PhoneNumber], [UserTypeId], [ActiveStatus])
VALUES ('abc123', 'John Smith', 'John', 'Smith', 'john.smith@example.com', '555-1234', 1, 1),
('def456', 'Jane Doe', 'Jane', 'Doe', 'jane.doe@example.com', '555-5678', 2, 1),
('ghi789', 'Bob Johnson', 'Bob', 'Johnson', 'bob.johnson@example.com', '555-9012', 2, 1)

INSERT INTO [Store] ([Name], [PhoneNumber], [Address], [ActiveStatus])
VALUES ('Store 1', '555-1111', '123 Main St', 1),
('Store 2', '555-2222', '456 Elm St', 1),
('Store 3', '555-3333', '789 Oak St', 0)

INSERT INTO [Day] ([Name]) VALUES ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday'), ('Sunday')

INSERT INTO [Job] ([UserProfileId], [Description], [CreateDateTime], [ScheduledTime], [StoreId], [Notes], [ActiveStatus])
VALUES (1, 'Manager shift', '2023-05-05 09:00:00', '2023-05-07 12:00:00', 1, 'Bring keys', 1),
(2, 'Cashier shift', '2023-05-05 12:00:00', '2023-05-06 16:00:00', 2, 'Bring uniform', 1),
(2, 'Stocking shift', '2023-05-05 08:00:00', '2023-05-08 10:00:00', 3, NULL, 0)

INSERT INTO [JobSchedule] ([DayId], [JobId]) VALUES (1, 1), (3, 2), (5, 3)

INSERT INTO [CompletedJob] ([DateCompleted], [JobScheduleId], [Notes], [TimeIn], [TimeOut], [StartingOdometer], [EndingOdometer], [Halfs], [Pints], [Snacks], [Complete])
VALUES ('2023-05-07 12:05:00', 1, 'Everything went smoothly', '2023-05-07 09:00:00', '2023-05-07 12:05:00', 12345, 12400, 10, 5, 3, 1),
('2023-05-06 16:05:00', 2, 'Had trouble with one customer', '2023-05-06 12:00:00', '2023-05-06 16:05:00', 23456, 23500, 8, 2, 1, 1)