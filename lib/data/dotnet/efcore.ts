import { Category } from '../types';

export const efcoreCategory: Category = {
  id: 'efcore',
  name: 'Entity Framework Core',
  icon: '🗄️',
  description: 'Object-Relational Mapper (ORM) สำหรับจัดการฐานข้อมูลใน .NET',
  commands: [
    {
      id: 'dbcontext',
      name: 'DbContext',
      description: 'คลาสหลักที่ใช้เชื่อมต่อและทำงานร่วมกับฐานข้อมูล',
      syntax: 'public class AppDbContext : DbContext',
      examples: [
        {
          title: 'การสร้างคลาส DbContext',
          code: `using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    // กำหนดตารางในฐานข้อมูล
    public DbSet<Product> Products { get; set; }
}`
        }
      ]
    },
    {
      id: 'dbset',
      name: 'DbSet<T>',
      description: 'ตัวแทนของตาราง (Table) ในฐานข้อมูล สำหรับทำ Query และบันทึกข้อมูล',
      syntax: 'public DbSet<User> Users { get; set; }',
      examples: [
        {
          title: 'การคิวรีข้อมูลผ่าน DbSet',
          code: `// ค้นหาสินค้าที่ราคามากกว่า 100 และเรียงตามชื่อ
var expensiveProducts = await dbContext.Products
    .Where(p => p.Price > 100)
    .OrderBy(p => p.Name)
    .ToListAsync();

// ค้นหาสินค้าตาม Primary Key
var product = await dbContext.Products.FindAsync(1);`
        }
      ]
    },
    {
      id: 'save-changes',
      name: '.SaveChangesAsync()',
      description: 'บันทึกการเปลี่ยนแปลงทั้งหมด (Insert, Update, Delete) ลงฐานข้อมูล',
      syntax: 'await _context.SaveChangesAsync()',
      examples: [
        {
          title: 'การเพิ่มข้อมูลและบันทึกการเปลี่ยนแปลง',
          code: `// 1. สร้างออบเจกต์ใหม่
var newProduct = new Product { Name = "Laptop", Price = 25000 };

// 2. เพิ่มลงใน DbSet
dbContext.Products.Add(newProduct);

// 3. บันทึกลงฐานข้อมูล
await dbContext.SaveChangesAsync();`
        }
      ]
    }
  ]
};
