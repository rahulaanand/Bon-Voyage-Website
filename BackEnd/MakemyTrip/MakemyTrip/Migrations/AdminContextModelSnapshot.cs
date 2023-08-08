﻿// <auto-generated />
using MakemyTrip.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MakemyTrip.Migrations
{
    [DbContext(typeof(AdminContext))]
    partial class AdminContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MakemyTrip.Models.Admin", b =>
                {
                    b.Property<int>("Admin_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Admin_Id"));

                    b.Property<string>("Admin_Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Admin_Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Admin_Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Admin_Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("MakemyTrip.Models.ImageGallery", b =>
                {
                    b.Property<int>("TourId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TourId"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LocationImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TourId");

                    b.ToTable("ImageGallery");
                });

            modelBuilder.Entity("MakemyTrip.Models.TravelAgent", b =>
                {
                    b.Property<int>("AgentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AgentId"));

                    b.Property<string>("AgencyImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AgentEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AgentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AgentPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("PhoneNumber")
                        .HasColumnType("bigint");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AgentId");

                    b.ToTable("TravelAgents");
                });
#pragma warning restore 612, 618
        }
    }
}