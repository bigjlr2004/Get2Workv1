INSERT INTO [UserType] ([Name])
VALUES ('Admin'), ('Employee');

-- Insert users
INSERT INTO [UserProfile] ([FirebaseUserId], [DisplayName], [FirstName], [LastName], [Email], [HireDate], [Address], [UserTypeId], [Notes], [ActiveStatus])
VALUES
('user1', 'John Doe', 'John', 'Doe', 'johndoe@example.com', '2021-01-01', '123 Main St', 1, 'Admin User', 1),
('user2', 'Jane Smith', 'Jane', 'Smith', 'janesmith@example.com', '2022-02-01', '456 Elm St', 2, NULL, 1),
('user3', 'Bob Johnson', 'Bob', 'Johnson', 'bobjohnson@example.com', '2022-03-01', '789 Oak St', 2, NULL, 1),
('user4', 'Sue Wilson', 'Sue', 'Wilson', 'suewilson@example.com', '2022-04-01', '1011 Maple St', 2, NULL, 1);

-- Insert stores
INSERT INTO [Store] ([Name], [PhoneNumber], [Address], [ActiveStatus])
VALUES
('Store 1', '555-1111', '123 Main St', 1),
('Store 2', '555-2222', '456 Elm St', 1),
('Store 3', '555-3333', '789 Oak St', 1),
('Store 4', '555-4444', '1011 Maple St', 1);

-- Insert jobs
INSERT INTO [Job] ([UserProfileId], [Description], [CreateDateTime], [ScheduledTime], [StoreId], [Notes], [ActiveStatus])
VALUES
(2, 'Job 1', '2022-04-15 10:00:00', '2022-04-20 10:00:00', 1, NULL, 1),
(2, 'Job 2', '2022-04-16 10:00:00', '2022-04-21 10:00:00', 2, NULL, 1),
(2, 'Job 3', '2022-04-17 10:00:00', '2022-04-22 10:00:00', 3, NULL, 1),
(2, 'Job 4', '2022-04-18 10:00:00', '2022-04-23 10:00:00', 4, NULL, 1),
(2, 'Job 5', '2022-04-19 10:00:00', '2022-04-24 10:00:00', 1, NULL, 1),
(2, 'Job 6', '2022-04-20 10:00:00', '2022-04-25 10:00:00', 2, NULL, 1),
(2, 'Job 7', '2022-04-21 10:00:00', '2022-04-26 10:00:00', 3, NULL, 1),
(2, 'Job 8', '2022-04-22 10:00:00', '2022-04-27 10:00:00', 4, NULL, 1);

CREATE TABLE [Day] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(28) NOT NULL
)

INSERT INTO [Day] ([Name]) VALUES ('Sunday')
INSERT INTO [Day] ([Name]) VALUES ('Monday')
INSERT INTO [Day] ([Name]) VALUES ('Tuesday')
INSERT INTO [Day] ([Name]) VALUES ('Wednesday')
INSERT INTO [Day] ([Name]) VALUES ('Thursday')
INSERT INTO [Day] ([Name]) VALUES ('Friday')
INSERT INTO [Day] ([Name]) VALUES ('Saturday')

CREATE TABLE [JobSchedule] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Date] datetime NOT NULL,
  [JobId] int NOT NULL,
  [DayId] integer NOT NULL,
  [Notes] nvarchar(255),
  [TimeIn] datetime,
  [TimeOut] datetime,
  [StartingOdometer] integer,
  [EndingOdometer] integer,
  [Halfs] integer,
  [Pints] integer,
  [Snacks] integer,
  [Complete] bit
)
GO
ALTER TABLE [JobSchedule] ADD CONSTRAINT [FK_JobSchedule_Job] FOREIGN KEY ([JobId]) REFERENCES [Job] ([Id])
GO

ALTER TABLE [JobSchedule] ADD CONSTRAINT [FK_JobSchedule_Day] FOREIGN KEY ([DayId]) REFERENCES [Day] ([Id])
GO