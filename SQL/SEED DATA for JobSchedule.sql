
SET NOCOUNT ON

DECLARE @startDate DATETIME = '2023-04-27'
DECLARE @endDate DATETIME = '2023-05-14'
DECLARE @jobId INT
DECLARE @dayId INT
DECLARE @notes NVARCHAR(255)
DECLARE @timeIn DATETIME
DECLARE @timeOut DATETIME
DECLARE @halfs INT
DECLARE @pints INT
DECLARE @snacks INT
DECLARE @complete BIT

DECLARE @rowCount INT = 0
DECLARE @maxRowCount INT = 15 -- change this to generate more or less data

WHILE @rowCount < @maxRowCount
BEGIN
    SET @jobId = ROUND(RAND() * 7 + 1, 0)
    SET @dayId = ROUND(RAND() * 6 + 1, 0)
    SET @notes = CONCAT('Notes for Job #', @jobId, ' on Day #', @dayId)
    SET @timeIn =NULL
    SET @timeOut = NULL
    SET @halfs = ROUND(RAND() * 10, 0)
    SET @pints = ROUND(RAND() * 10, 0)
    SET @snacks = ROUND(RAND() * 10, 0)
    SET @complete = 0

    INSERT INTO JobSchedule (Date, JobId, DayId, Notes, TimeIn, TimeOut, Halfs, Pints, Snacks, Complete)
    VALUES (DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @startDate, @endDate), 0), @startDate), @jobId, @dayId, @notes, @timeIn, @timeOut,  @halfs, @pints, @snacks, @complete)

    SET @rowCount = @rowCount + 1
END



