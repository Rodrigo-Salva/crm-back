-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL');

-- AlterTable
ALTER TABLE "deals" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MXN';

-- AlterTable
ALTER TABLE "price_list_items" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MXN';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MXN';

-- AlterTable
ALTER TABLE "quote_line_items" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MXN';

-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MXN';
