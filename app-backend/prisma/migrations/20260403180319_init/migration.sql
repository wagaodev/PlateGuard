-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'car',
    "vehicleModel" TEXT,
    "vehicleColor" TEXT,
    "accessType" TEXT NOT NULL DEFAULT 'resident',
    "status" TEXT NOT NULL,
    "qrCodeToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "reason" TEXT,
    "entryMethod" TEXT NOT NULL DEFAULT 'CAMERA',
    "requestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccessLog_plate_fkey" FOREIGN KEY ("plate") REFERENCES "Vehicle" ("plate") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_qrCodeToken_key" ON "Vehicle"("qrCodeToken");
