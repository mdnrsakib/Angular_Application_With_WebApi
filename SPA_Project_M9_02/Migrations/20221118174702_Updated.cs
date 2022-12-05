using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPA_Project_M9_02.Migrations
{
    public partial class Updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Tourists",
                newName: "TouristId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TouristId",
                table: "Tourists",
                newName: "Id");
        }
    }
}
