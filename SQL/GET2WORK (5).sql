CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(20) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [HireDate] datetime NOT NULL,
  [Address] nvarchar(50) NOT NULL,
  [UserTypeId] integer NOT NULL,
  [Notes] nvarchar(255),
  [ActiveStatus] bit
)
GO

CREATE TABLE [Store] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] NVARCHAR(50) NOT NULL,
  [PhoneNumber] nvarchar(11) NOT NULL,
  [Address] nvarchar(50) NOT NULL,
  [ActiveStatus] bit
)
GO

CREATE TABLE [Job] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] integer NOT NULL,
  [Description] NVARCHAR(50) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ScheduledTime] datetime NOT NULL,
  [StoreId] integer NOT NULL,
  [Notes] nvarchar(255),
  [ActiveStatus] bit
)
GO

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

CREATE TABLE [Day] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(28) NOT NULL
)
GO

CREATE UNIQUE INDEX [UQ_FirebaseUserId] ON [UserProfile] ("FirebaseUserId")
GO

ALTER TABLE [UserProfile] ADD CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Job] ADD CONSTRAINT [FK_UserProfile_Job] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Job] ADD CONSTRAINT [FK_Store_Job] FOREIGN KEY ([StoreId]) REFERENCES [Store] ([Id])
GO

ALTER TABLE [JobSchedule] ADD CONSTRAINT [FK_JobSchedule_Job] FOREIGN KEY ([JobId]) REFERENCES [Job] ([Id])
GO

ALTER TABLE [JobSchedule] ADD CONSTRAINT [FK_JobSchedule_Day] FOREIGN KEY ([DayId]) REFERENCES [Day] ([Id])
GO
