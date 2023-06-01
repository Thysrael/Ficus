---
title: CPP设计-string
mathjax: true
tags:
  - CPP设计
  - S5假期
  - 直观理解
categories: CPP设计
abbrlink: c59d80ea
date: 2023-02-05 11:32:40
---

## 一、IO 

是没有办法使用 C 风格的 IO 去输入和输出字符串的，也就是说，下面的程序是会发生段错误的。

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() 
{
	string s;
	scanf("%s", s);
	printf("%s", s);
	return 0;
}
```

如果想要进行正确的 IO，需要利用 `cin, cout` ，如下所示

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() 
{
	string s1, s2, s3, s4;

	cin >> s1;
	// cin.getline(s2, 20);
	// cin.get(s3, 20);
	getline(cin, s4);

	cout << s1 << endl;
	// cout << s2 << endl;
	// cout << s3 << endl;
	cout << s4 << endl;
	return 0;
}
```

最常见的是下面，会发现读到**空白符**就会停止。

```cpp
cin >> s1;
```

如果想要读取一整行，会发现这两个方法是没有办法通过编译的，这是因为这两个方法只能读取 C 风格字符串（即字符数组），无法读取

```cpp
cin.getline(s2, 20);
cin.get(s3, 20);
```

所以想要读取整行，需要用这种方法

```cpp
getline(cin, s4);
```

这种方法到结束符时，会将结束符一并读入指定的 string 中，再将结束符替换为空字符。

对于上面的程序，如果我输出

```shell
hello, world cnx!
```

会输出

```cpp
hello, 
 world cnx!

```

当然如果想要使用 C 风格的 IO，可以这样操作

```cpp
string s5;
scanf("%s", s5.c_str());
printf("%s\n", s5.c_str());
```

`c_str()` 会返回 `string` 内的字符数组头指针，就可以快乐 C 了。

---



## 二、初始化

总程序如下

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    string s1 = "hello";
	string s2("hello");
	cout << s1 << endl;
	cout << s2 << endl;

    string s3 = s1;
	string s4(s1);
    cout << s3 << endl;
	cout << s4 << endl;

    char *cs1 = "world";
    char cs2[] = "world";
	string s5(cs1);
	string s6(cs2);
	cout << s5 << endl;
	cout << s6 << endl;
    return 0;
}
```

### 2.1 字符串初始化

```cpp
string s1 = "hello";
string s2("hello");
cout << s1 << endl;
cout << s2 << endl;
```

这两个调用的应该是一个方法，只不过是两种不同的调用形式，这两种都是可以的。这个我给他起名“**类型转换构造器**”，对于它的机理，应该是这样（我只实现了一个简易的 `MyString` ）：

```cpp
#include <bits/stdc++.h>

using namespace std;

class MyString 
{
public:
	int len;
	MyString(const char *s)
	{
		len = strlen(s);
		cout << "CAST CUSTRUCT" << endl;
	}
};

int main()
{
	MyString s1 = "hello, world";
	MyString s2("Hi, cnx");

	cout << s1.len << " " << s2.len << endl;
    return 0;
}
```

这个程序的输出是这样的

```shell
CAST CUSTRUCT
CAST CUSTRUCT
12 7
```

### 2.2 复制构造器

对于

```cpp
string s3 = s1;
string s4(s1);
cout << s3 << endl;
cout << s4 << endl;
```

与 java 不同，`string` 的复制，并不是只复制了指向对象的指针，而是完全的进行了一次深拷贝，也就是产生了一个新的 `string`，上面的过程会发生在 `a = b, a(b)` 同时还有传参（其实也是一种初始化）的时候 ，就会调用这个构造器。

其基本原理大概是这样（相比于前一个，我增加了运算符重载的展示），下面尝试了“赋值，复制构造，传参，返回返回值”四种方法，调用的都是复制构造器。

```cpp
#include <bits/stdc++.h>

using namespace std;

class MyString 
{
public:
	int len;

	MyString(const char *s): len(strlen(s))
	{
		cout << "CAST CONSTRUCT" << endl;
	}

	MyString(const MyString &s): len(s.len)
	{
		cout << "COPY CONSTRUCT" << endl;
	}

	friend ostream& operator<< (ostream &os, const MyString &s)
	{
		os << s.len;
		return os;
	}
};

MyString show(MyString s)
{
    cout << s.len << endl;
	return s;
}

int main()
{
	MyString s1 = "hello, world";
	MyString s2("Hi, cnx");
	cout << s1 << " " << s2 << endl;

	MyString s3 = s1;
	MyString s4(s1);
	show(s4);
	cout << s3 << " " << s4 << endl;

    return 0;
}
```

所以最终一共输出四次 copy 

```cpp
COPY CONSTRUCT
COPY CONSTRUCT
COPY CONSTRUCT
12
COPY CONSTRUCT
```

### 2.3 字符数组初始化

本质和用 `string` 进行初始化没有区别，可以正常工作就说明 `string` 内部实现了这种构造器。

```cpp
char *cs1 = "world";
char cs2[] = "world";
string s5(cs1);
string s6(cs2);
```

---



## 三、比较运算

### 3.1 总论

比较运算是一个非常非常必要了解的东西，这是因为大量的算法和数据结构都依赖与这些的定义，我把比较运算分为两类，一个是相等性判断，一种是比较判断。相等判断可以进行去重等操作，同时对于多次插入的值也有一定的影响，比较判断可以用于排序，还有构建有序的数据结构，比如说堆和红黑树。

### 3.2 相等性

代码如下

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
	string s1 = "abc";
	string s2 = s1;
	string s3 = "ABC";
	printf("s1 address is 0x%x\n", &s1);
	printf("s2 address is 0x%x\n", &s2);
	printf("s3 address is 0x%x\n", &s3);

	if (s1 == s2)
	{
		printf("s1 == s2\n");
	}

	if (s1 != s2)
	{
		printf("s1 != s2\n");
	}

	if (s2 != s3)
	{
		printf("s2 != s3\n");
	}
	return 0;
}
```

其输出就是

```shell
s1 address is 0xecdf6110
s2 address is 0xecdf6130
s3 address is 0xecdf6150
s1 == s2
s2 != s3
```

可以看到，这些字符串是完全不同的独立的字符串，在 java 中，只要地址不用，那么就无法判断等于，而在 cpp 中，`==` 是逻辑上的，而不是地址比价上的。

在没有定义一个自定义结构体的 `==` 时，直接让 `s1 == s2` 会报一个 `not match` 的错误（从这里可以看出，在 CPP 中并没有“**一切皆对象**”的效果，现在看来，这里意味着，对一个普通的类，并没有像 java 中的  `Object` 一样的 `equal` 一样的“保底”方法 ），所以如果需要有相等性的比较的时候，我们需要定义 `==` 运算符。如下所示

```cpp
#include <bits/stdc++.h>

using namespace std;

class MyString
{
public:
    int len;

    MyString(string s)
    {
        len = s.length();
    }

	// bool operator== (const MyString &other)
	// {
	// 	cout << "EQUEL OPERATOR" << endl;
	// 	return len == other.len;
	// }
};

bool operator== (const MyString &a, const MyString &b)
{
	cout << "EQUEL OPERATOR" << endl;
	return a.len == b.len;
}

int main()
{
    MyString s1("hello");
    MyString s2("world");
    MyString s3("1");

    if (s1 == s2)
    {
        printf("s1 == s2\n");
    }
    else
    {
        printf("s1 != s2\n");
    }

    if (s1 == s3)
    {
        printf("s1 == s3\n");
    }
    else
    {
		printf("s1 != s3\n");
    }
    return 0;
}
```

定义的两种方式都是可以的，类内的定义会更加优先。

### 3.3 比较性

就是按照字典序进行比较，十分好理解，如果从这个角度看，其实 `string` 已经像一个基本的类型了。

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
	string s1 = "123456";
	if (s1 < "234")
	{
		printf("\"123456\" < \"234\"\n");
	}
	else
	{
		printf("\"123456\" >= \"234\"\n");
	}
    return 0;
}
```

可以看到不但可以 `string` 和 `string` 比，对于 `string` 和 `字符串` 也是可以比的，cpp 中的字符串本质是 `const char[]` 。

对于比较性，如果考虑自己实现，一共有三种定义比较性的方法

```cpp
#include <bits/stdc++.h>

using namespace std;

class MyString
{
public:
    int len;

    MyString(string s)
    {
        len = s.length();
    }

    MyString()
    {
        len = 0;
    }

    bool operator==(const MyString &other)
    {
        cout << "EQUEL OPERATOR1" << endl;
        return len == other.len;
    }

    bool operator<(const MyString &other)
    {
        cout << "COMPARE OPERATOR1" << endl;
        return len < other.len;
    }
};

bool operator==(const MyString &a, const MyString &b)
{
    cout << "EQUEL OPERATOR2" << endl;
    return a.len == b.len;
}

bool operator>(const MyString &a, const MyString &b)
{
    cout << "COMPARE OPERATOR2" << endl;
    return a.len > b.len;
}

struct COMPARE
{
    bool operator()(const MyString &a, const MyString &b)
    {
        cout << "COMPARE OPERATOR3" << endl;
        return a.len < b.len;
    }
};

int main()
{
    MyString s1("hello");
    MyString s2("world");
    MyString s3("1");

    if (s1 < s2)
    {
        printf("s1 < s2\n");
    }
    else
    {
        printf("s1 >= s2\n");
    }

    MyString ss[3];
    ss[0] = s2;
    ss[1] = s1;
    ss[2] = s3;
    sort(ss, ss + 3, COMPARE());
    for (int i = 0; i < 3; i++)
    {
        cout << ss[i].len << endl;
    }
    return 0;
}
```

其输出如下

```cpp
COMPARE OPERATOR1
s1 >= s2
COMPARE OPERATOR3
COMPARE OPERATOR3
COMPARE OPERATOR3
1
5
5
```

对于第一种

```cpp
bool operator<(const MyString &other)
{
    cout << "COMPARE OPERATOR1" << endl;
    return len < other.len;
}
```

注意 CPP 没有那么智能，即使是 `s1 >= s2` 也是不行的，必须是 `s1 < s2`。

第二种

```cpp
bool operator>(const MyString &a, const MyString &b)
{
    cout << "COMPARE OPERATOR2" << endl;
    return a.len > b.len;
}
```

当然其实也可以不重载运算符，而是直接写个函数。

第三种

```cpp
struct COMPARE
{
    bool operator()(const MyString &a, const MyString &b)
    {
        cout << "COMPARE OPERATOR3" << endl;
        return a.len < b.len;
    }
};
```

所谓的**函数对象**就是“像函数一样的对象”，也就是完成了重载  `()` 的对象。其调用的时候，调用的是类

```cpp
sort(ss, ss + 3, COMPARE());
```

---



## 四、字符串格式化

探讨这个东西是因为我突然发现，用 cpp 实现一个 `to_string` 十分的困难，究其原因，是 cpp 中没有一个和 python 中 `format` 一样，或者 C 中 `sprintf`，完全无法格式化字符串。所以必须要用 `streamstream` 进行愚蠢的字符串格式化。

同时会发现 `to_string` 是一个很困难的事情其实，所以没有 gc 的语言感觉好难啊。

```cpp
char *to_cstring() 
{
    // memory leak without delete[]
    char *s = new char[30];
    sprintf(s, "MyString len is %d", len);
    return s;
}

string to_string()
{
    stringstream format;
    format << "MyString len is " << len;
    return format.str();
}
```

---



## 五、遍历

可以说，可以用 `[]` 进行访问。可以用迭代器访问，可以用加强 for 循环访问

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
	string s = "abcde";

	for (int i = 0; i < s.length(); i++)
	{
		cout << s[i];
	}
	cout << endl;

	for (string::iterator iter = s.begin(); iter < s.end(); iter++)
	{
		cout << *iter;
	}
	cout << endl;

	for (auto iter = s.rbegin(); iter < s.rend(); iter++)
	{
		cout << *iter;
	}
	cout << endl;

	for (char &c : s)
	{
		c += 1;
	}

	for (auto c : s)
	{
		cout << c;
	}
	cout << endl;

	return 0;
}
```

这两种被叫做加强 `for` 循环

```cpp
for (char &c : s)
{
    c += 1;
}

for (auto c : s)
{
    cout << c;
}
cout << endl;
```

可以看到，如果是加一个 `&` 引用，是可以修改它的内容的，否则是不能修改内容的（可以通过编译，但是修改不起作用）。

---



## 六、其他功能

### 6.1 删除

其实删除在字符串中应用并不多，但是使用迭代器删除的效果在 java 中有体现，在 cpp 中更加恶心，java 只是没法用加强 for 循环，只要用了迭代器啥事没有，但是在 cpp 中，即使使用了迭代器，删除会变得更加恶心，比如说下面这样的代码

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    string s = "abcde";

	for (auto iter = s.begin(); iter < s.end(); iter++)
	{
		s.erase(iter);
		cout << s << endl;
	}
    return 0;
}
```

这是输出

```shell
bcde
bde
bd
```

这是因为当一个东西被删除了之后，它的迭代器会指向下一个元素，而 `for` 会导致让原本就指向下一个元素的迭代器，指向下下个元素，这就导致了无法连续删除的现象。

### 6.2 长度

```cpp
s.length();
s.size(); // 似乎这种更加常用
```

没有区别，都是可以使用的。同时他不会统计结尾的空白符。

### 6.3 查找子串

如果找得到的话，就会返回子串开始的位置的下标（这是独特的，因为在其他的 stl 容器中，会返回迭代器，而不是一个整型量），如果没有找到，则返回 -`1` 。如下所示

查找一般是两个方法，一种是从 `index = 0` 开始查找，这样只需要传入待查找子串一个参数，而另一种需要传入两个参数，可以指定开始查找的位置。下面的例子展示了这两种用法，用于找出 `str` 中的所有 `substr`

```cpp
for (int pos = str.find(substr); pos != -1; pos = str.find(substr, pos + 1))
{
    cout << pos << endl;
}
```

### 6.4 替换

替换函数 `replace` 需要给出三个参数，分别指定开始位置 `pos`，替换的长度 `len` 和替换串 `str`，这三个变量是缺一不可的，这是因为我们需要 `pos, len` 去描述被替换的子串的大小，而 `str` 是替换子串的内容。

至于为啥不把 `pos, len` 合并成一个 `string`，这就不知道了，如下所示

```cpp
string s1 = "abcde";
string s2 = "xyz";
// 将 [0, 1) 的内容 ("x") 替换成 "xyz"
s1.replace(0, 1, s2);
// xyzbcde
cout << s1 << endl;
```

