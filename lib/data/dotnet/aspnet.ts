import { Category } from '../types';

export const aspnetCategory: Category = {
  id: 'aspnet',
  name: 'ASP.NET Core',
  icon: '🌐',
  description: 'เฟรมเวิร์กสำหรับสร้างเว็บแอปพลิเคชันและ Web API',
  commands: [
    {
      id: 'program-cs',
      name: 'Program.cs (Minimal API)',
      description: 'จุดเริ่มต้นของแอปพลิเคชัน (Entry Point) สำหรับตั้งค่าและรันเซิร์ฟเวอร์',
      syntax: 'var builder = WebApplication.CreateBuilder(args);',
      examples: [
        {
          title: 'การสร้างและรัน Web API อย่างง่าย',
          code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();`
        }
      ]
    },
    {
      id: 'map-get',
      name: 'app.MapGet() / MapPost()',
      description: 'สร้าง Endpoint ในรูปแบบ Minimal API',
      syntax: 'app.MapGet("/path", () => "Hello")',
      examples: [
        {
          title: 'การสร้าง GET และ POST Endpoint',
          code: `// คืนค่าข้อความธรรมดา
app.MapGet("/api/hello", () => "Hello Minimal API");

// รับข้อมูล JSON จาก Body และคืนค่ากลับ
app.MapPost("/api/users", (User user) => {
    // บันทึกข้อมูล
    return Results.Created($"/api/users/{user.Id}", user);
});`
        }
      ]
    },
    {
      id: 'middleware',
      name: 'Middleware',
      description: 'แทรกแซง Request/Response Pipeline (เช่น การทำ Authentication, Logging)',
      syntax: 'app.Use(async (context, next) => { ... })',
      examples: [
        {
          title: 'การสร้าง Custom Middleware อย่างง่าย',
          code: `app.Use(async (context, next) =>
{
    // ทำงานก่อนเรียก middleware ถัดไป
    var watch = System.Diagnostics.Stopwatch.StartNew();
    
    await next.Invoke();
    
    // ทำงานหลังจาก middleware ถัดไปทำงานเสร็จ
    watch.Stop();
    var responseTime = watch.ElapsedMilliseconds;
    Console.WriteLine($"ใช้เวลา: {responseTime} ms");
});`
        }
      ]
    },
    {
      id: 'di',
      name: 'Dependency Injection',
      description: 'การลงทะเบียน Service (Transient, Scoped, Singleton) เข้าสู่ระบบ DI',
      syntax: 'builder.Services.AddScoped<IService, Service>()',
      examples: [
        {
          title: 'การลงทะเบียนและใช้งาน Service',
          code: `// 1. ลงทะเบียน Service แบบ Scoped
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// 2. ใช้งาน Service ใน Endpoint (ผ่าน DI)
app.MapGet("/users", (IUserService userService) => {
    return userService.GetAllUsers();
});`
        }
      ]
    }
  ]
};
