# Angor Liquid Network Integration Competency Test

This project demonstrates basic integration capabilities with the Liquid Network, a Bitcoin sidechain, as part of the Angor wallet integration competency test.

## Requirements

- .NET 7.0 or later
- Node.js 18+ and npm
- Elements Core (for Liquid Network node)
- Git
- Visual Studio 2022 or VS Code

## Project Structure

```
.
├── README.md
├── LiquidService/           # C# backend service for Liquid operations
│   ├── LiquidService.csproj
│   ├── Services/
│   └── Models/
├── AngorWeb/               # React frontend application
│   ├── package.json
│   ├── src/
│   └── public/
└── AngorImprovement/       # Small improvement to Angor codebase
```

## Setup Instructions

1. Install Elements Core:
   ```bash
   # Follow instructions at https://docs.liquid.net/docs/getting-started
   ```

2. Set up Liquid testnet node:
   ```bash
   # Configure elements.conf with testnet settings
   # Start elementsd with testnet flag
   elementsd -testnet
   ```

3. Build and run the backend service:
   ```bash
   cd LiquidService
   dotnet build
   dotnet run
   ```

4. Start the React frontend:
   ```bash
   cd AngorWeb
   npm install
   npm start
   ```

## Competency Test Components

1. Liquid Network Node Setup
   - Set up Elements Core
   - Connect to Liquid testnet
   - Verify node synchronization

2. Backend Service (C#)
   - REST API for Liquid operations
   - Address generation
   - Asset information retrieval
   - Transaction handling

3. Frontend Application (React)
   - Modern, responsive UI
   - Address generation interface
   - Asset information display
   - Transaction management
   - Integration with Angor's design system

4. Angor Codebase Improvement
   - Small enhancement demonstrating familiarity with project structure
   - Documentation of changes

## Stretch Goal
- Implement basic asset transfer between Liquid addresses
- Create a seamless UX for asset management
- Demonstrate integration with Angor's architecture

## Resources
- [Liquid Network Documentation](https://docs.liquid.net/)
- [Elements Core](https://github.com/ElementsProject/elements)
- [Angor Protocol](https://github.com/block-core/bcips/blob/main/bcip-0005.md)
- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [React Documentation](https://reactjs.org/docs/getting-started.html) 