-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "reason" TEXT,
    "entryMethod" TEXT NOT NULL DEFAULT 'CAMERA',
    "requestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehiclePlate" TEXT,
    CONSTRAINT "AccessLog_vehiclePlate_fkey" FOREIGN KEY ("vehiclePlate") REFERENCES "Vehicle" ("plate") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AccessLog" ("entryMethod", "id", "plate", "reason", "requestedAt", "result") SELECT "entryMethod", "id", "plate", "reason", "requestedAt", "result" FROM "AccessLog";
DROP TABLE "AccessLog";
ALTER TABLE "new_AccessLog" RENAME TO "AccessLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
