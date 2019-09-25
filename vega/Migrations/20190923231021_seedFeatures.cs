using Microsoft.EntityFrameworkCore.Migrations;

namespace vega.Migrations
{
    public partial class seedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into dbo.features (Name) values ('Features1')");
            migrationBuilder.Sql("Insert into dbo.features (Name) values ('Features2')");
            migrationBuilder.Sql("Insert into dbo.features (Name) values ('Features3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from dbo.features");
        }
    }
}
