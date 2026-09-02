import { Category } from '../types';

export const dataStructuresCategory: Category = {
  id: 'data-structures',
  name: 'Data Structures',
  icon: '🔗',
  description: 'โครงสร้างข้อมูลชั้นสูงใน JavaScript (เน้น Linked List)',
  commands: [
    {
      id: 'linked-list-intro',
      name: 'Linked List คืออะไร?',
      description: 'Linked List เป็นโครงสร้างข้อมูลที่เก็บสมาชิก (Node) แบบเรียงต่อกัน โดยแต่ละ Node จะชี้ (Pointer) ไปยัง Node ถัดไป ต่างจาก Array ที่จองพื้นที่หน่วยความจำติดกัน',
      syntax: 'class Node { constructor(value) { this.value = value; this.next = null; } }',
      examples: [
        {
          title: 'การสร้าง Node พื้นฐาน',
          language: 'javascript',
          code: `class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null; // ชี้ไปที่ Node ถัดไป
  }
}

// สร้าง Nodes
const node1 = new ListNode(10);
const node2 = new ListNode(20);

// เชื่อม Nodes เข้าด้วยกัน
node1.next = node2;
console.log(node1);`,
          output: `ListNode { value: 10, next: ListNode { value: 20, next: null } }`
        }
      ],
      notes: 'ข้อดีคือการเพิ่ม/ลบข้อมูลที่หัวหรือกลางลิสต์ทำได้เร็ว (O(1)) ไม่ต้องเลื่อนข้อมูลเหมือน Array (O(n))',
      tags: ['linked-list', 'data-structure', 'node']
    },
    {
      id: 'node-properties',
      name: 'การใช้งาน .value และ .next',
      description: 'ทำความเข้าใจวิธีดึงค่าข้อมูลและการกระโดดไปยัง Node ถัดไป ซึ่งเป็นพื้นฐานสำคัญที่สุดในการทำโจทย์',
      syntax: 'node.value / node.next / node.next.next',
      examples: [
        {
          title: 'การอ่านค่าและการกระโดดข้าม Node',
          language: 'javascript',
          code: `// สมมติเรามี Linked List: 10 -> 20 -> 30 -> null
const head = new ListNode(10);
head.next = new ListNode(20);
head.next.next = new ListNode(30);

// 1. ดึงค่า (value)
console.log(head.value);             // 10
console.log(head.next.value);        // 20
console.log(head.next.next.value);   // 30

// 2. ถ้าเข้าถึง .value ของ null จะเกิด Error!
// console.log(head.next.next.next.value); // ❌ Error: Cannot read properties of null

// 3. การเปลี่ยนค่า
head.next.value = 99;
console.log(head.next.value);        // 99`
        },
        {
          title: 'การขยับ Pointer แบบทีละก้าว (current = current.next)',
          language: 'javascript',
          code: `let current = head;

while (current !== null) {
  console.log(current.value); // พิมพ์ค่าปัจจุบัน
  
  // ขยับ current ให้ชี้ไปยังโหนดถัดไป
  current = current.next; 
}
// เมื่อลูปจบ current จะมีค่าเป็น null`
        }
      ],
      notes: '⚠️ ข้อควรระวัง: ก่อนจะเรียกใช้ .value ต้องมั่นใจว่า Node นั้นไม่ใช่ null (มักแก้โดยใช้เงื่อนไข if (node !== null))'
    },
    {
      id: 'singly-linked-list-setup',
      name: 'Singly Linked List (การกำหนดโครงสร้าง)',
      description: 'Singly Linked List มีการชี้ไปทิศทางเดียวจาก Head ไปถึง Tail',
      syntax: 'class LinkedList { constructor() { this.head = null; this.tail = null; this.length = 0; } }',
      examples: [
        {
          title: 'โครงสร้างเริ่มต้น',
          language: 'javascript',
          code: `class LinkedList {
  constructor(value) {
    const newNode = new ListNode(value);
    this.head = newNode; // จุดเริ่มต้น
    this.tail = this.head; // จุดสิ้นสุด
    this.length = 1; // ความยาว
  }
}

const myLinkedList = new LinkedList(10);
console.log(myLinkedList);`,
          output: `LinkedList { head: ListNode { value: 10, next: null }, tail: ListNode { value: 10, next: null }, length: 1 }`
        }
      ],
      seeAlso: ['linked-list-intro']
    },
    {
      id: 'sll-append',
      name: '.append()',
      description: 'การเพิ่ม Node ใหม่ไปที่ส่วนท้าย (Tail) ของ Linked List',
      syntax: 'append(value) { ... }',
      examples: [
        {
          title: 'โค้ดสำหรับฟังก์ชัน Append (O(1))',
          language: 'javascript',
          code: `append(value) {
  const newNode = new ListNode(value);
  if (!this.head) {
    // ถ้าลิสต์ยังว่างอยู่
    this.head = newNode;
    this.tail = newNode;
  } else {
    // ให้ tail เดิมชี้ไปที่โหนดใหม่
    this.tail.next = newNode;
    // เปลี่ยน tail ปัจจุบันเป็นโหนดใหม่
    this.tail = newNode;
  }
  this.length++;
  return this;
}`
        }
      ],
      notes: 'เนื่องจากเราเก็บ pointer ของ this.tail เอาไว้ การ append จึงใช้เวลาแค่ O(1) เสมอ'
    },
    {
      id: 'sll-prepend',
      name: '.prepend()',
      description: 'การเพิ่ม Node ใหม่ไปที่ส่วนหน้าสุด (Head) ของ Linked List',
      syntax: 'prepend(value) { ... }',
      examples: [
        {
          title: 'โค้ดสำหรับฟังก์ชัน Prepend (O(1))',
          language: 'javascript',
          code: `prepend(value) {
  const newNode = new ListNode(value);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    // ให้โหนดใหม่ชี้ไปที่ head เดิม
    newNode.next = this.head;
    // ย้าย head มาที่โหนดใหม่
    this.head = newNode;
  }
  this.length++;
  return this;
}`
        }
      ]
    },
    {
      id: 'sll-traverse',
      name: 'การ Traverse / Search',
      description: 'การเดินตามลำดับ (Traverse) เพื่อดูค่า หรือค้นหาข้อมูลใน Linked List',
      syntax: 'let current = this.head; while (current !== null) { ... }',
      examples: [
        {
          title: 'แปลงเป็น Array เพื่อง่ายต่อการดูผลลัพธ์ (O(n))',
          language: 'javascript',
          code: `printList() {
  const array = [];
  let currentNode = this.head;
  
  while (currentNode !== null) {
    array.push(currentNode.value);
    currentNode = currentNode.next;
  }
  return array;
}`
        },
        {
          title: 'ค้นหา Index ของ Node (O(n))',
          language: 'javascript',
          code: `traverseToIndex(index) {
  // ควบคุมให้อยู่ในขอบเขต
  let counter = 0;
  let currentNode = this.head;
  while (counter !== index) {
    currentNode = currentNode.next;
    counter++;
  }
  return currentNode;
}`
        }
      ],
      notes: 'การเข้าถึงข้อมูลตัวที่ n ใช้เวลา O(n) เพราะต้องไล่จาก head ไปเรื่อยๆ ต่างจาก Array ที่ใช้ O(1) ในการเรียกตำแหน่ง index โดยตรง'
    },
    {
      id: 'sll-insert-delete',
      name: '.insert() & .remove()',
      description: 'การแทรกและการลบข้อมูลตรงกลาง Linked List',
      syntax: 'insert(index, value) / remove(index)',
      examples: [
        {
          title: 'Insert แทรกตรงกลาง (O(n))',
          language: 'javascript',
          code: `insert(index, value) {
  if (index >= this.length) return this.append(value);
  if (index === 0) return this.prepend(value);

  const newNode = new ListNode(value);
  const leader = this.traverseToIndex(index - 1); // โหนดก่อนหน้า
  const holdingPointer = leader.next; // โหนดเดิมที่โดนดันไป
  
  leader.next = newNode;
  newNode.next = holdingPointer;
  this.length++;
  return this;
}`
        },
        {
          title: 'Remove ลบข้อมูล (O(n))',
          language: 'javascript',
          code: `remove(index) {
  if (index >= this.length || index < 0) return undefined;
  
  // กรณีลบตัวแรก
  if (index === 0) {
    this.head = this.head.next;
    this.length--;
    return this;
  }

  const leader = this.traverseToIndex(index - 1);
  const unwantedNode = leader.next;
  
  // ข้ามโหนดที่ต้องการลบไปเลย (เชื่อมโหนดก่อนหน้าเข้ากับโหนดถัดไป)
  leader.next = unwantedNode.next;
  this.length--;
  return this;
}`
        }
      ],
      notes: 'เคล็ดลับคือการหา Leader (โหนดที่อยู่ก่อนหน้า index ที่เราต้องการจัดการ) เพื่อนำมาสลับสาย Pointer'
    },
    {
      id: 'doubly-linked-list',
      name: 'Doubly Linked List (DLL)',
      description: 'Linked List แบบสองทิศทาง มีทั้ง pointer ชี้ไปตัวถัดไป (next) และชี้กลับไปตัวก่อนหน้า (prev)',
      syntax: 'class DoublyNode { constructor(val) { this.val = val; this.next = null; this.prev = null; } }',
      examples: [
        {
          title: 'โครงสร้าง Doubly Linked List',
          language: 'javascript',
          code: `class DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null; // เพิ่ม prev ขึ้นมา
  }
}

// ตอน Append ต้องอัปเดต prev ด้วย
append(value) {
  const newNode = new DoublyNode(value);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.prev = this.tail;  // ชี้กลับ
    this.tail.next = newNode;  // ชี้ไป
    this.tail = newNode;
  }
  this.length++;
  return this;
}`
        }
      ],
      notes: 'ข้อดีของ DLL: สามารถค้นหาข้อมูลจากข้างหลังย้อนมาข้างหน้าได้ ทำให้การหาข้อมูลค่อนหลังทำได้เร็วขึ้น (O(n/2)) | ข้อเสีย: กินหน่วยความจำมากขึ้นเพราะต้องเก็บ prev pointer เพิ่มขึ้น'
    },
    {
      id: 'dummy-node',
      name: 'Dummy Node (โหนดปลอม)',
      description: 'เทคนิคที่ใช้บ่อยในการแก้โจทย์ Algorithm (เช่น LeetCode) เพื่อป้องกันปัญหาจุกจิกเมื่อต้องแก้ไข Head ของ Linked List',
      syntax: 'const dummy = new ListNode(0); dummy.next = head;',
      examples: [
        {
          title: 'การสร้างและการใช้ Dummy Node',
          language: 'javascript',
          code: `function removeElements(head, val) {
  // สร้างโหนดปลอมมาเชื่อมไว้หน้า head
  // ช่วยให้ไม่ต้องเขียนเงื่อนไขเช็ค if (head.value === val) ซ้ำซ้อน
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let current = dummy;
  
  while (current.next !== null) {
    if (current.next.value === val) {
      // ข้ามโหนดที่มีค่าตรงกับที่ต้องการลบ
      current.next = current.next.next;
    } else {
      // เดินหน้าต่อไป
      current = current.next;
    }
  }
  
  // คืนค่า head จริง (ซึ่งอาจถูกเปลี่ยนไปแล้วถ้าตัวแรกโดนลบ)
  return dummy.next;
}`
        },
        {
          title: 'ใช้ Dummy Node เชื่อม 2 Linked List (Merge Two Sorted Lists)',
          language: 'javascript',
          code: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(-1); // โหนดปลอมเพื่อเป็นจุดเริ่มต้น
  let current = dummy;
  
  while (list1 !== null && list2 !== null) {
    if (list1.value <= list2.value) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  // ต่อส่วนที่เหลือ
  current.next = list1 !== null ? list1 : list2;
  
  return dummy.next; // มองข้าม dummy (-1) และคืนส่วนหัวที่แท้จริง
}`
        }
      ],
      notes: '🔥 หัวใจสำคัญของโจทย์ Algorithm! การใช้ Dummy Node ช่วยลดการเขียน if/else เพื่อเช็ค Edge Case (เช่น ถ้า List ว่าง หรือถ้าตัวที่ต้องเปลี่ยนคือตัวแรกสุด) ได้อย่างมหาศาล'
    },
    {
      id: 'linked-list-vs-array',
      name: 'การเปรียบเทียบ (Big-O Notation)',
      description: 'เปรียบเทียบประสิทธิภาพระหว่าง Array กับ Linked List',
      syntax: '// สรุปความต่างของ Big-O',
      examples: [
        {
          title: 'ตารางเปรียบเทียบ Time Complexity',
          language: 'javascript',
          code: `/*
Operation      |  Array   |  Linked List
-----------------------------------------
Access/Lookup  |  O(1)    |  O(n)
Search         |  O(n)    |  O(n)
Insert/Delete  |  O(n)*   |  O(1)**
Append         |  O(1)    |  O(1)

* Array: การแทรกหรือลบตรงกลางต้อง Shift เลื่อนข้อมูลทุกตัวหลังจากนั้น (O(n))
** Linked List: แค่สลับ Pointer เท่านั้น (O(1)) (ถ้าไม่นับเวลา Traverse หาจุด)
*/`
        }
      ]
    }
  ]
};
