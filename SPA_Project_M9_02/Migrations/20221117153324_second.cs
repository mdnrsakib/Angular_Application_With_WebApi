using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPA_Project_M9_02.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PackageFeatures",
                newName: "PackageFeatureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PackageFeatureId",
                table: "PackageFeatures",
                newName: "Id");
        }
    }
}
