using Xunit;
using Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using Microsoft.EntityFrameworkCore;
using MakemyTrip.Context;
using Microsoft.AspNetCore.Hosting;
using MakemyTrip.Repo;
using MakemyTrip.Models;

namespace MakemyTrip.Tests
{
    public class AgentRepoTests
    {
        [Fact]
        public async Task CreateTravelAgent_ValidData_ReturnsAgent()
        {
            // Arrange
            var dbContextOptions = new DbContextOptionsBuilder<AdminContext>()
                .UseInMemoryDatabase(databaseName: "CreateTravelAgent_TestDatabase")
                .Options;

            using (var context = new AdminContext(dbContextOptions))
            {
                var mockWebHostEnvironment = new Mock<IWebHostEnvironment>();
                mockWebHostEnvironment.Setup(env => env.WebRootPath).Returns(Directory.GetCurrentDirectory());

                var agentRepo = new AgentRepo(context, mockWebHostEnvironment.Object);

                var agent = new TravelAgent
                {
                    AgentName = "Test Agent",
                    // Add other required properties
                };

                using (var stream = new MemoryStream(new byte[0])) // Simulate an image file
                {
                    var formFile = new FormFile(stream, 0, stream.Length, "image", "test.jpg");

                    // Act
                    var createdAgent = await agentRepo.CreateTravelAgent(agent, formFile);

                    // Assert
                    Assert.NotNull(createdAgent);
                    Assert.Equal("Requested", createdAgent.Status);
                    // Add more assertions as needed
                }
            }
        }

        // Add more test cases for other methods similarly
    }
}
