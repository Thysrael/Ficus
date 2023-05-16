---
title: Ruby设计-基础语法
mathjax: true
tags:
  - S5课上
  - Ruby设计
  - 知识总结
categories: Ruby设计
abbrlink: a728a9c5
date: 2022-09-02 15:22:08
---

## 一、脚本语言

​	我似乎对于 Python 和 Ruby 强求太多了，我要让他们实现 C 的所有功能。他们确实可以实现所有的功能，但是他们的目的不是为了这个。

​	我也可以用 shell 实现很多复杂的算法，但是我绝对不会用他去写图着色或者动态规划。但是我使用 python 和 Ruby 的时候却又这种倾向。我不会强求 C 为我列出目录中的所有文件，但是我却会强求 python，可叹啊。

​	我之前似乎把语言看成了算法和架构的载体和实现，怪不得过得这么不幸福。

---



## 二、调用命令

​	神奇用法，可以直接调用 `ls` 这样的指令。

```ruby
print <<`EOC`                 # 执行命令
    ls -al
EOC
```

​	这或许进一步说明了它就是个脚本。

---



## 三、外部传参

​	ruby 的脚本调用的时候是可以传参的，下面的脚本

```ruby
puts ARGV.class
puts ARGV.first
puts ARGV.last
puts ARGV[1]
```

​	如果在 `zsh` 中输入 

```shell
ruby argv.rb 1 2 3 
```

​	那么输出是

```
Array
1
3
2
```

​	就是将后面的输入视为一个数组，原理比较显然。

---



## 四、输入输出

​	输出比较简单的是 `puts` 类似于 C 语言中 `puts`（有种传言说 `ruby` 特意模仿了一些 C）。如果想要格式化输出，也是可以的，见下

```ruby
# format output
puts "Hello %s" %["cnx"]
puts "Hello %c" %[65]
puts "Hello %x" %[2147483648]

months = "Jan\nFeb\nMar\nApr\nMay\nJun\nJul\nAug"
puts months
```

​	输入没有细致探讨过，似乎这个是可以的

```ruby
# input
a = gets.chomp 
puts a 
```

---



## 五、文件操作

​	跟 C 依然很像，太像了

```ruby
filename = ARGV.first
script = $0

puts "Opening the file..."
target = File.open(filename, 'w')

puts "Truncating the file.  Goodbye!"
target.truncate(target.size)

puts "Now I'm going to ask you for three lines."

print "line 1: "; line1 = STDIN.gets.chomp()
print "line 2: "; line2 = STDIN.gets.chomp()
print "line 3: "; line3 = STDIN.gets.chomp()

puts "I'm going to write these to the file."

target.write(line1)
target.write("\n")
target.write(line2)
target.write("\n")
target.write(line3)
target.write("\n")

puts "And finally, we close it."
target.close()

src = File.open(filename, "r")
indata = src.read()

puts "The input file is #{indata.length} bytes long"
puts "The input data is "
puts indata
```

----



## 六、数据结构

### 6.1 Hash

​	HashMap 的意思，感觉比 Java 的还好用，语法有点像 `C++`。

```ruby
grades = {'CNX' => 100, 'QS' => 0, 'LSZ' => 120}

puts grades['CNX']
grades['QS'] = 20

grades.each do |name, grade|
	puts "#{name} : #{grade}"
end
```

### 6.2 语句块

​	这是一个很有意思的东西，就是我们可以定义一个被叫做“**块**“的结构，有两种写法

```ruby
do |x|
	x *= x
    puts x
end

{|x| x *= x; puts x}
```

然后这个块结构就可以作为函数参数传参了（感觉有点函数式和匿名函数的意思了），比如说这个

```ruby
grades.each do |name, grade|
	puts "#{name} : #{grade}"
end
```

​	其实是作为 `hash` 的  `grades` 对象调用 `each` 方法，这个方法有一个参数，就是这个块 

```ruby
grades.each (do |name, grade|
	puts "#{name} : #{grade}"
end)
```

### 6.3 整数

​	取整的时候是向下取整，而不是向零取整，这点与 C 或者 Java 不同，但是与 Python 相同。

### 6.4 Array

​	声明形式是这样的

```ruby
a = [1, 2, 3, 4]
```

​	有的时候还可以骚一点

```ruby
a = Array.new(4) {|i| i + 1}
```

​	对于数组的索引访问，跟 python 一样强大，支持负数。

```ruby
puts a[0] 	# 1
puts a[-1] 	# 4
```

​	和 python 一样，支持切片

```ruby
b = Array.new(5) {|i| (i + 'A'.ord).chr}
printf "%s\n", b			# "A", "B", "C", "D", "E"]

printf "%s\n", b[1, 3] 		# ["B", "C", "D"]
printf "%s\n", b[2..4]		# ["C", "D", "E"]
```

​	同时有了一堆好用的操作符

```ruby
c = [1, 2, 3]
puts c.to_s			# [1, 2, 3]
c += [4, 5, 1]
puts c.to_s			# [1, 2, 3, 4, 5, 1]
c -= [1, 4, 5]
puts c.to_s			# [2, 3]
c *= 3
puts c.to_s			# [2, 3, 2, 3, 2, 3]
c << 5
puts c.to_s			# [2, 3, 2, 3, 2, 3, 5]
```

### 6.5 Range

​	似乎 python 中也有这种结构，但是这个似乎被当成了独立的一种内置的数据结构

```ruby
(1..5)        #==> 1, 2, 3, 4, 5
(1...5)       #==> 1, 2, 3, 4
('a'..'d')    #==> 'a', 'b', 'c', 'd'
```

### 6.6 Symbol

​	符号，就是编译原理里符号表里的那个符号，Ruby 的神奇就在于可以直接在程序中定义这个符号，方法是加个标识符

```ruby
a = :s
puts a

b = :"s"
puts b

puts b.equal?a		# true
```



## 七、注释

单行注释

```ruby
# There is a single line comment
```

多行注释

```ruby
=begin
	There are comments.
	There are comments.
	There are comments.
	There are comments.
=end
```

---



## 八、标识符里的标点符号

```ruby
$var	# 全局变量
@var	# 实例变量，就是面向对象中属性的意思
@@var	# 类变量，就是 Java 中静态属性的意思
empty? 	# 'empty?' 是方法的名字，如果以 ? 结尾，说明这个方法返回值是布尔值
sort!	# 'sort!' 是方法的名字，如果以 ! 结尾，说明这个方法会改变对象本身，而不是返回一个被改变的 clone
```

---



## 九、迭代器

​	这里的迭代器其实不是一个 `Java` 或者 `cpp` 中出现的跟指针一样可以自增的东西，而是一个方法，这个方法接受一个代码块作为参数。这里利用了关键词 `yield` 。示例如下，我模拟了一个数组，然后实现了它的迭代器方法 `each`

```ruby
class MyArray
    def initialize(a)
        @a = a 
    end

    def each 
        for i in 0...@a.size
            yield @a[i]
        end
    end
end

a = [1, 2, 3]
my_a = MyArray.new(a)
my_a.each do |e|
    puts e
end
```

​	可以看到，对于 `each` 方法，在实现中进行了遍历，但是并没有说明遍历要干什么，只是有一个

```ruby
yield @a[i]
```

​	对于这个情况， `yield` 会调用我们传给他的代码块，也就是

```ruby
do |e| puts e end
```

​	然后给形参 `e` 赋值 `@a[i]` ，然后对于数组中的每个元素有一个 `puts e` 的操作，相当于这个

```ruby
for i in 0...@a.size
	puts @a[i]
end
```

​	可以看到代码块的这种方式，大大拓展了原有函数的功能。

​	我们可以再看一个例子，这个例子不是类中的例子，而就是普通的一个方法，用于输出一个等差数列。

```ruby
def sequence(n, step, c)
    (0..n).each do |i|
        yield i * step + c
    end
end

sequence(5, 3, 2) {|x| puts x}
```

