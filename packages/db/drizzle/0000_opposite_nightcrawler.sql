CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(30) DEFAULT 'trader' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "trading_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"broker" varchar(100) NOT NULL,
	"platform" varchar(30) DEFAULT 'MT5' NOT NULL,
	"account_number" varchar(100) NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"balance" numeric(18, 2) DEFAULT '0' NOT NULL,
	"equity" numeric(18, 2) DEFAULT '0' NOT NULL,
	"margin" numeric(18, 2) DEFAULT '0' NOT NULL,
	"free_margin" numeric(18, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"symbol" varchar(30) NOT NULL,
	"direction" varchar(10) NOT NULL,
	"volume" numeric(12, 4) NOT NULL,
	"entry" numeric(18, 8) NOT NULL,
	"current_price" numeric(18, 8) NOT NULL,
	"stop_loss" numeric(18, 8),
	"take_profit" numeric(18, 8),
	"profit_loss" numeric(18, 2) DEFAULT '0' NOT NULL,
	"opened_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"symbol" varchar(30) NOT NULL,
	"direction" varchar(10) NOT NULL,
	"type" varchar(30) NOT NULL,
	"status" varchar(30) NOT NULL,
	"volume" numeric(12, 4) NOT NULL,
	"price" numeric(18, 8) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "trading_accounts" ADD CONSTRAINT "trading_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_account_id_trading_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."trading_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_account_id_trading_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."trading_accounts"("id") ON DELETE cascade ON UPDATE no action;