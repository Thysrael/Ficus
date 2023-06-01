---
title: CPP设计-STL
mathjax: true
tags:
  - CPP设计
  - S3假期
  - 直观理解
categories: CPP设计
abbrlink: 72a1069c
date: 2022-02-04 19:03:52
---

## 一、总论

STL提供了一组表示容器、迭代器、函数对象（没看懂，不会）和算法的模板。

- 容器是一个与数组类似的单元，可以存储若干个值。STL的容器是同质的，即存储的值的类型相同；
- 算法是完成特定任务的方法；
- **迭代器**能够用来遍历容器的对象，与能够遍历数组的指针类似，是广义指针；
- 函数对象是**类似于函数的对象**，可以是类对象或函数指针（包括函数名，因为函数名被用作指针）。

STL是一种**泛型编程**（generic programming）**模板**使得算法独立于存储的数据类型，而**迭代器**使算法的独立于使用的容器类型。

---



## 二、迭代器

迭代器其实就是我理解的**游标**，因为很多的算法都需要遍历一组数据的集合（比如说排序算法），所以我们就需要一个游标一样的东西在这组集合上面移动。这组集合可以是一个数组，也可以是一个链表，还可以是一个树，当然，也可以是容器。所以**迭代器**是很重要的。

同时迭代器也是不同的，比如说我们操作数组的时候，一般用**索引值**（数组下标） `i,j,k` 这类东西来当做迭代器。而我们在操作链表的时候，一般都用一个链表节点的指针当做迭代器，比如说 `p,q,cur,pre` 之类的。

当我们提出迭代器的概念的时候，希望的是忽略容器的类型，比如说从前到后遍历一个数据集合。无论这个集合是数组形式实现的，还是链表形式实现的，我们在遍历的过程中都有一个“**让迭代器等于迭代器后继**”这样的一个思想，在数组中表现为 `i = i + 1` 在链表中表现为 `cur = cur->next` 所以如果我们把这个过程抽象出来，那么就可以不考虑具体的容器是啥样的，而达到设计算法的目的，也就是说，实现了上面提到的“**迭代器**使算法的独立于使用的容器类型。”

但是也需要注意到，不是所有的容器都有完美的迭代器的，比如说链表的迭代器**指针**，他是没有**固定时间复杂度**来进行**随机访问**的，也就是类似这种操作 `*(a + n)` ，指针必须**线性时间复杂度**完成这个功能。这种功能就可以说是不能理想实现的。依照功能的实现，我们将迭代器进行分类，分类如下

| 迭代器功能                                           | 输入 | 输出 | 正向 | 双向 | 随机访问 |
| ---------------------------------------------------- | ---- | ---- | ---- | ---- | -------- |
| 解除引用读取 `*i`                                    | Y    | -    | Y    | Y    | Y        |
| 解除引用写入 `*i = `                                 | -    | Y    | Y    | Y    | Y        |
| 固定和可重复排序（按照相同顺序去遍历，允许多趟算法） | -    | -    | Y    | Y    | Y        |
| `i++, ++i`                                           | Y    | Y    | Y    | Y    | Y        |
| `i--, --i`                                           | -    | -    | -    | Y    | Y        |
| `i[n]`                                               | -    | -    | -    | -    | Y        |
| `i + n`                                              | -    | -    | -    | -    | Y        |
| `i - n`                                              | -    | -    | -    | -    | Y        |
| `i += n`                                             | -    | -    | -    | -    | Y        |
| `i -= n`                                             | -    | -    | -    | -    | Y        |
| `i - j`                                              | -    | -    | -    | -    | Y        |
| `i compare j`                                        | -    | -    | -    | -    | Y        |

之所以要有这样一个清晰的认识，是因为如果功能不足，很可能有些算法是实现不了的（比如说快排就没办法在链表的迭代器上实现）。我们在编写算法的时候尽可能使用要求最低的迭代器，并让它适用于容器的最大区间。

不过有一些看起来很没有道理，比如说双向迭代器没法支持 `i + n` 操作，但是可以支持 `i++` 操作，但是只要将 `i++` 重复执行 `n` 次，就可以完成这种操作，这可能是上面说的操作都是可以在 $O(1)$ 时间复杂度内完成。

不同类型的迭代器本质不是类型，而是一系列要求。STL算法可以使用任何满足其要求的迭代器实现。STL文献使用术语**概念（concept）**来描述一系列要求。**概念**可以具有类似继承的关系。比如双向迭代器继承了正向迭代器的功能。STL文献使用术语**改进（refinement）**来表示这种概念上的继承，因此，双向迭代器是对正向迭代器**概念**的**改进**。概念的具体实现被叫做**模型（model）**。

---



## 三、容器

### 3.1 容器

容器是存储其他对象的对象，被存储的对象必须是同一种类型的，它们可以是OOP意义上的对象，也可以是内置类型。容器可以分成三大类：

- 序列 sequence：线性容器，包括 `vector, deque, list, queue, priority_queue, stack, forward_list` 
- 关联容器 associative container：树形键值对容器，包括 `set, multiset, map, multimap`
- 无序关联容器 unordered associative container：哈希键值对容器，包括 `unordered_set, unordered_multiset, unordered_map, unordered_multimap`，是 C++11 的新标准。

容器具有一些基本的方法：

| 表达式      | 返回类型       | 说明                                         |
| ----------- | -------------- | -------------------------------------------- |
| `a.begin()` | `iterator`     | 返回指向容器第一个元素的迭代器               |
| `a.end()`   | `iterator`     | 指向超尾迭代器                               |
| `a.size()`  | `unsigned int` | 返回元素个数                                 |
| `a.swap(b)` | `void`         | 交换 a 和 b 的内容                           |
| `a == b`    | `bool`         | 如果 a 和 b 的长度相同，且元素均相同，则为真 |
| `a != b`    | `bool`         | 返回 `!(a == b)`                             |

同时容器是支持“插入 `insert` 和删除 `erase` ”的，显然如果不支持这两个基本的编辑操作，这个数据结构也没啥意义了，只不过对于不同的容器，其功能有所区别，比如说对于 sequence 来说，`insert` 可以指定插入的位置，但是关联容器就没有这个功能，这是因为关联容器的顺序是排序关系决定的，无法指定。

### 3.2 序列

#### 3.2.1 序列总论

可以通过**添加要求**来改进基本的容器概念。序列（sequence）是一种重要的改进。序列概念增加了“**迭代器至少是正向迭代器**”。而且序列还要求其元素按严格的线性顺序排列。

序列的种类虽然多，但是其底层只有 `vector, deque, list, forward_list`  4 中，其他的如 `stack, queue, priority_queue` 之类的只是建立在前面的容器上的适配器（adapter）又称包装类，他们进一步封装了这些容器，然后提供了一些更加独特的 API。

序列中有一些方法**针对头部和尾部**的插入删除，有些序列可以实现，有些没有实现，在了解了其底层实现结构后，就可以很轻松的理解。

| 函数         | 含义     | 容器        |
| ------------ | -------- | ----------- |
| front()      | 头部元素 | 均可        |
| back()       | 尾部元素 | 均可        |
| push_front() | 插入头部 | vector 不可 |
| pop_front()  | 删除头部 | vector 不可 |
| push_back()  | 插入尾部 | 均可        |
| pop_back()   | 删除尾部 | 均可        |

#### 3.2.2 vector

 	`vector` 是最基础的类，其底层是一个数组，所以用于**随机访问的迭代器**，所以基本上 `a[i]` 这种操作是支持的。

但是因为底层是数组，所以对于头部的删除和增加无能为力。

#### 3.2.3 deque

`deque` 是“双端队列（double end queue）”的意思，其底层实现是一个在数组上实现的循环队列，所以他既具有**随机访问的迭代器**，又可以有在头部插入的快速操作。

但是 `deque` 的实现是比 `vector` 更加复杂的，所以 `vector` 在随机访问和中段的编辑中要优于 `deque`。

#### 3.2.4 list

底层实现是双向链表，**不具有**随机访问的迭代器。正因为不具有随机访问的迭代器，所以有一些功能会受到限制，比如说 STL 算法库中的 `sort` 需要随机访问的迭代器，如果没有的话，那么就无法进行。

为了更好地发挥链表的优势，所以考虑一些特定的方法，如下所示

| 方法                                  | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| void merge(list other)                | 合并两个已经排好序的链表，合并后 other 链表为空，复杂度为 $O(n)$ |
| void remove(const T &val)             | 删除所有的 val 元素，复杂度为 $O(n)$                         |
| void sort()                           | 使用 < 运算符对链表排序，时间复杂度为 $O(NlogN)$             |
| void splice(iterator pos, list other) | 将链表 other 的内容插入到 pos 之前，other 的内容为空，时间复杂度为 $O(1)$ |
| void unique()                         | 将**连续**的相同元素压缩为单个元素，时间复杂度为 $O(n)$      |

#### 3.2.5 forward_list

是一个单项的链表，只有正向迭代器，相比于 `list` 要更加简单紧凑，但是功能也受到了限制。

#### 3.2.6 queue, stack

两者都是适配器类，`queue` 的底层是 `deque`，`stack` 的底层是 `vector` ，他们多出了三个方法，如下所示：

| 表达式      | 含义                            |
| ----------- | ------------------------------- |
| `a.empty()` | 一个布尔函数，为空时返回 `true` |
| `a.push()`  | 压入元素，是 `void` 返回值      |
| `a.pop()`   | 弹出元素，是 `void` 返回值      |

#### 3.2.7 priority_queue

优先队列，支持的操作与 `queue` 类似，本质是一个利用数组实现的堆。默认是一个小根堆，堆顶的元素是最大的元素。

因为涉及到了比较操作，所以 STL 允许我们定义比较函数，示例如下

```cpp
#include <bits/stdc++.h>
#include <queue>

using namespace std;

struct Node
{
public:
    int x, y;
    Node(int x, int y) :
        x(x), y(y)
    {
    }
    void show() const
    {
        cout << "x: " << x << ", y: " << y << endl;
    }

	// attention to the second 'const'
	bool operator< (const Node &other) const
	{
		if (other.x == x)
		{
			return y > other.y;
		}
		else 
		{
			return x > other.x;
		}
	}
};

// wrong
bool cmp(const Node &a, const Node &b)
{
    if (a.x == b.x)
    {
        return a.y < b.y;
    }
    else
    {
        return a.x < b.y;
    }
}

struct COMPARE
{
    bool operator()(const Node &a, const Node &b)
    {
        if (a.x == b.x)
        {
            return a.y < b.y;
        }
        else
        {
            return a.x < b.x;
        }
    }
};

int main()
{
	// three type arguments
    priority_queue<Node, vector<Node>, COMPARE> q;
    q.push(Node(3, 2));
    q.push(Node(1, 2));
    q.push(Node(1, 1));
    q.push(Node(5, 1));

    while (!q.empty())
    {
		q.top().show();
        q.pop();
    }

	cout << "==========" << endl;
	// one type argument
    priority_queue<Node> q1;
    q1.push(Node(3, 2));
    q1.push(Node(1, 2));
    q1.push(Node(1, 1));
    q1.push(Node(5, 1));

    while (!q1.empty())
    {
		q1.top().show();
        q1.pop();
    }
    return 0;
}
```

比较函数有三种形式，正如上所示，对于**比较函数**，是行不通的，只有**比较函数对象**和**内置的重载运算符**可以实现，在自定义的时候，有两种声明形式，一种是三参数的，分别指明了元素类型、底层容器类型和比较函数对象，如下所示

```cpp
priority_queue<Node, vector<Node>, COMPARE> q;
```

如果是重载运算符，那么用一个单参数的就好了

```cpp
priority_queue<Node> q1;
```

如果希望排序的是一个基础类型，可以利用 `greater<>` 函数对象，如下所示

```c
priority_queue<int, vector<int>, greater<int>> q;
```

### 3.3 关联容器

关联容器一般采用树结构进行实现（应该是红黑树）将值与键关联在一起，并使用键来查找值（感觉就是 python 中的**字典**），包括 set，multiset， map， multimap。

#### 3.3.1 map

只有一个**双向迭代器，不支持 `iter + n` 这样的操作**，会自动根据 `less<Key>` 进行排序，所以利用迭代器访问的时候是有序的。当然也可以自定义排序规则，如下所示

```cpp
std::map<std::string, int, std::greater<std::string> >myMap{ {"C语言教程",10},{"STL教程",20} };
```

此时用迭代器访问的结果是这样的

```cpp
<"STL教程", 20>
<"C语言教程", 10>
```

虽然迭代器并不是随机访问的，但是却支持根据 key 值查找，如下所示

```cpp
smap["A"] = 1;
smap["B"] = 2;
```

其中比较相等用到的是重载的 `==` 。

对于map的方法，有

```cpp
begin()         //返回指向map头部的迭代器

clear(）        //删除所有元素

count()         //返回指定元素出现的次数

empty()         //如果map为空则返回true

end()           //返回指向map末尾的迭代器

equal_range()   //返回特殊条目的迭代器对

erase()         //删除一个元素

find()          //查找一个元素

get_allocator() //返回map的配置器

insert()        //插入元素

key_comp()      //返回比较元素key的函数

lower_bound()   //返回键值>=给定元素的第一个位置

max_size()      //返回可以容纳的最大元素个数

rbegin()        //返回一个指向map尾部的逆向迭代器

rend()          //返回一个指向map头部的逆向迭代器

size()          //返回map中元素的个数

swap()          //交换两个map

upper_bound()   //返回键值>给定元素的第一个位置

value_comp()    //返回比较元素value的函数

```



---



## 四、算法

### 4.1 sort()

sort算法使用如下，可以看到实现了对**序列**的升降序排列：

```cpp
#include<bits/stdc++.h>

using namespace std;

int a[5] = {1, 5, 3, 2, 4};

bool cmp(int a, int b)
{
    if(a > b) return true;
    else return false;
}

int main()
{
    sort(a, a + 5);
    for(int i = 0; i < 5; i++)
    {
        cout<<a[i]<<" ";
    }
    cout<<endl;
    
	// sort(a, a + 5, greater<int>()); 这种写法也可以
    sort(a, a + 5, cmp);
     for(int i = 0; i < 5; i++)
    {
        cout<<a[i]<<" ";
    }
    cout<<endl;   

}
```

### 4.2 lower_bound() 和 upper_bound()

在**从小到大**的数组中，`lower_bound()` 会在规定的范围内找到**大于等于**指定 `val` 的第一个元素，并且返回指向这个元素的**迭代器**。采用的是**二分查找**，所以时间复杂度是 $\log_2 n$ 。

`upper_bound()` 会在规定的范围内找到**大于**指定 `val` 的第一个元素，其他要素与`lower_bound()`相同，用法如下

```cpp
lower_bound(iterator begin, iterator end, ValueType val)
```

此外，`lower_bound()` 还接受自定义的比较过程，比如重载函数

```cpp
lower_bound(iterator begin, iterator end, ValueType val, cmp)
```

有如下示例

```cpp
#include<bits/stdc++.h>

using namespace std;

int a[5] = {1, 7, 5, 2, 4};

bool cmp(int a, int b)
{
    if(a > b) return true;
    else return false;
}

int main()
{
    sort(a, a + 5);

    int pos = lower_bound(a, a + 5, 2) - a;
    cout << "The lower_bound() result is " << pos << endl;
    pos = upper_bound(a, a + 5, 2) - a;
    cout << "The upper_bound() result is " << pos << endl;


    sort(a, a + 5, greater<int>());
    pos = lower_bound(a, a + 5, 2, greater<int>()) - a;
    cout << "The lower_bound() result is " << pos << endl;
    pos = upper_bound(a, a + 5, 2, greater<int>()) - a;
    cout << "The upper_bound() result is " << pos << endl;

}
```

