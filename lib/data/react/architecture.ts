import { Category } from '../types';

export const architectureCleanCodeCategory: Category = {
  id: 'architecture-clean-code',
  name: 'Clean Code & Architecture',
  icon: '🏗️',
  description: 'การออกแบบสถาปัตยกรรม Component, การแก้ปัญหา Props Drilling และหลักการ Clean Code',
  commands: [
    {
      id: 'component-composition',
      name: 'Component Composition (แก้ Props Drilling)',
      description: 'เทคนิคการหลีกเลี่ยงการส่ง Props ผ่าน Component ตรงกลางหลายๆ ชั้น (Props Drilling) ด้วยการส่งเป็น children',
      syntax: '<Layout><Header /></Layout>',
      examples: [
        {
          title: 'การแก้ Props Drilling ด้วย Slot Pattern',
          language: 'typescript',
          code: `// ❌ แบบผิดๆ (Props Drilling): ส่ง user ลงไป 3 ชั้นเพื่อให้ Avatar ได้ใช้
function App() {
  return <Navbar user={user} />;
}
function Navbar({ user }) {
  return <Menu user={user} />;
}
function Menu({ user }) {
  return <Avatar user={user} />;
}

// ✅ แบบคลีน (Composition): เสียบทะลุเป็น Slot (children) เลย
function App() {
  // Navbar และ Menu ไม่ต้องรู้จัก user อีกต่อไป!
  return (
    <Navbar>
      <Menu>
        <Avatar user={user} />
      </Menu>
    </Navbar>
  );
}

// ฝั่ง Navbar ก็แค่รับ { children } มา render
function Navbar({ children }) {
  return <nav className="nav">{children}</nav>;
}`
        }
      ]
    },
    {
      id: 'container-presentational',
      name: 'Container / Presentational Pattern',
      description: 'แยก Component ออกเป็น "ตัวประมวลผล (Logic)" และ "ตัววาดหน้าจอ (UI)"',
      syntax: 'แยกไฟล์ Data และ View',
      examples: [
        {
          title: 'ตัวอย่างการแยกส่วนรับผิดชอบ',
          language: 'typescript',
          code: `// 1. Presentational (รับเฉพาะ Props เอาไปวาด UI อย่างเดียว โง่ๆ)
function UserListUI({ users, onUserClick }) {
  return (
    <ul>
      {users.map(u => <li onClick={() => onUserClick(u)}>{u.name}</li>)}
    </ul>
  );
}

// 2. Container (ฉลาด: ดึงข้อมูล, จัดการ State, ยิง API)
function UserListContainer() {
  const { data: users } = useQuery(['users'], fetchUsers);
  
  const handleUserClick = (user) => console.log('Clicked', user);
  
  // นำข้อมูลที่ได้ไปป้อนให้ UI
  return <UserListUI users={users} onUserClick={handleUserClick} />;
}`
        }
      ],
      notes: '*ปัจจุบัน Pattern นี้อาจถูกแทนที่ด้วย Custom Hooks (ดึง Logic ไปไว้ใน Hook แทน) แต่หลักการแยก Logic vs UI ยังคงสำคัญอยู่'
    },
    {
      id: 'extract-custom-hooks',
      name: 'Clean Code: Extract to Custom Hooks',
      description: 'การแยก Logic ที่รกรุงรังใน Component ออกไปเป็น Custom Hooks (ทำให้อ่านง่ายและนำไปใช้ซ้ำได้)',
      syntax: 'function useMyLogic()',
      examples: [
        {
          title: 'แปลงโค้ดรกให้เป็นโค้ดคลีน',
          language: 'typescript',
          code: `// ❌ โค้ดรก: Component ทำหลายอย่างเกินไป
function ProductPage() {
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => { /* fetch logic */ }, []);
  const toggleModal = () => setIsOpen(!isOpen);

  return <div>...</div>;
}

// ✅ โค้ดคลีน: แยก Logic ออกไปเป็น Hook ตามหน้าที่ (Single Responsibility)
function useProductData(id) {
  // ... fetch logic
  return product;
}

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, toggle: () => setIsOpen(!isOpen) };
}

// Component จะเหลือแค่นี้! อ่านง่ายเหมือนอ่านหนังสือ
function ProductPage() {
  const product = useProductData(1);
  const modal = useModal();

  return <div>...</div>;
}`
        }
      ]
    },
    {
      id: 'folder-structure',
      name: 'Folder Structure (Feature-based)',
      description: 'การจัดโฟลเดอร์ตามฟีเจอร์การทำงาน แทนที่จะจัดตามประเภทไฟล์',
      syntax: '/features/auth/',
      examples: [
        {
          title: 'จัดโฟลเดอร์แบบ Enterprise',
          language: 'text',
          code: `❌ แบบเก่า (Type-based): ถ้าย้ายฟีเจอร์นึง ต้องตามไปลบหลายที่
src/
  components/
    LoginForm.tsx
    ProductList.tsx
  hooks/
    useAuth.ts
  api/
    authApi.ts

✅ แบบใหม่ (Feature-based): จบในตัว (Co-location)
src/
  features/
    auth/               # ข้อมูลทุกอย่างเกี่ยวกับการ Login อยู่โฟลเดอร์นี้
      components/LoginForm.tsx
      hooks/useAuth.ts
      api/authApi.ts
    products/           # ข้อมูลทุกอย่างเกี่ยวกับสินค้า
      components/ProductList.tsx`
        }
      ]
    }
  ]
};
