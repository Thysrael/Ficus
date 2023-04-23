const files = {
  path: 'C:\\Users\\22143\\Desktop\\test',
  name: 'test',
  children: [
    {
      name: 'test1.txt',
      path: 'C:\\Users\\22143\\Desktop\\test\\test1.txt',
      content: 'fhaf\r\nfafa\r\nafafs',
      type: 'file'
    },
    {
      name: 'test2.txt',
      path: 'C:\\Users\\22143\\Desktop\\test\\test2.txt',
      curChild: -1,
      offset: -1,
      content: 'klejahads\r\nkeafjl\r\njglsf',
      absolutePath: [
        'C:',
        'Users',
        '22143',
        'Desktop',
        'test',
        'test2.txt'
      ],
      type: 'file'
    },
    {
      name: 'test3.txt',
      path: 'C:\\Users\\22143\\Desktop\\test\\test3.txt',
      curChild: -1,
      offset: -1,
      content: 'iiiiiiiiiiiiiiiiiiiiiiii',
      absolutePath: [
        'C:',
        'Users',
        '22143',
        'Desktop',
        'test',
        'test3.txt'
      ],
      type: 'file'
    },
    {
      name: 'testFolder',
      path: 'C:\\Users\\22143\\Desktop\\test\\testFolder',
      curChild: -1,
      offset: -1,
      content: '',
      absolutePath: [
        'C:',
        'Users',
        '22143',
        'Desktop',
        'test',
        'testFolder'
      ],
      children: [
        {
          name: 'test.txt',
          path: 'C:\\Users\\22143\\Desktop\\test\\testFolder\\test.txt',
          curChild: -1,
          offset: -1,
          content: '',
          absolutePath: [
            'C:',
            'Users',
            '22143',
            'Desktop',
            'test',
            'testFolder',
            'test.txt'
          ],
          type: 'file'
        }
      ],
      type: 'folder'
    }
  ]

}

const link1 = [
  { id: 0, source: 0, target: 1, type: 0 },
  { id: 1, source: 0, target: 2, type: 0 },
  { id: 2, source: 0, target: 3, type: 0 },
  { id: 3, source: 0, target: 4, type: 0 },
  { id: 4, source: 4, target: 5, type: 0 }
]

const res1 = {
  name: 'test',
  path: 'C:\\Users\\22143\\Desktop\\test',
  children: [
    {
      name: 'test1.txt',
      path: 'C:\\Users\\22143\\Desktop\\test\\test1.txt',
      content: 'fhaf\r\nfafa\r\nafafs'
    },
    {
      name: 'test2.txt',
      path: 'C:\\Users\\22143\\Desktop\\test\\test2.txt',
      content: 'klejahads\r\nkeafjl\r\njglsf'
    },
    {
      name: 'test3.txt',
      path: 'C:\\Users\\22143\\Desktop\\test\\test3.txt',
      content: 'iiiiiiiiiiiiiiiiiiiiiiii'
    },
    {
      name: 'testFolder',
      path: 'C:\\Users\\22143\\Desktop\\test\\testFolder',
      children: [
        {
          name: 'test.txt',
          path: 'C:\\Users\\22143\\Desktop\\test\\testFolder\\test.txt',
          content: ''
        }
      ]
    }
  ]
}

const nodes1 = [
  { id: '0', name: 'test', category: 0 },
  { id: '1', name: 'test1.txt', category: 1 },
  { id: '2', name: 'test2.txt', category: 1 },
  { id: '3', name: 'test3.txt', category: 1 },
  { id: '4', name: 'testFolder', category: 0 },
  { id: '5', name: 'test.txt', category: 1 }
]

module.exports = {
  files,
  res1,
  link1,
  nodes1
}
