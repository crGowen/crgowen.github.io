import Page, { PageEntry } from "../../Page";

export default function MemSaving() {
    return (
        <Page width="normal">
            <PageEntry>
                <h1 className="blogHeader">
                    Computer memory: Padding, byte-size booleans, and memory addresses
                </h1>
                <p className="blogParagraph">
                    Memory management is a lost art in a world where nearly everybody has 1GB more RAM than they'll ever need, when I went to university it was barely discussed besides the obvious 'don't use a large type if a smaller size will do the job', and while it might seem like that is the be all and end all, it's far far from it. Self-taught programmers and YouTube gurus even tend to completely omit learning about some of the less obvious tips for memory efficiency.
                </p>

                <h1 className="blogSubheader">
                    Memory padding and byte alignment
                </h1>
                <p className="blogParagraph">
                    First let's talk about padding. Here's a question: how much memory does an object of class Example require?
                </p>
                <pre>{`
                    class Example
                    {
                        char y; //char = 1 byte
                        int x; //int = 4 bytes
                        short z; //short = 2 bytes

                        /* This is C++ code and these type sizes are accurate for C++ and my compiler,
                        but of course may vary language to language and compiler to compiler
                        (but generally won't, these are pretty standard types) */
                    };

                    int main()
                    {
                        Example ex;
                        std::cout << "Size = " << sizeof(ex) << " bytes.\\n";
                    }`}
                </pre>

                <p className="blogParagraph">
                    Intuitively its size is 1+4+2 = 7 bytes. But it's not, it's 12 bytes - run this code and see for yourself. The cause of this is data structure padding. In computer memory (for reasons of performance that I'm not going to elaborate on here) variables get stored on an aligned boundary. What does that mean? Well, it basically means that if you have a series of memory addresses:
                </p>
                <pre>{`
                    0, 1, 2, 3, 4, 5, 6, 7, 8,..., N.
                    `}
                </pre>
                <p className="blogParagraph">
                    A 1 byte variable can go anywhere.<br />
                    A 2 byte variable will only go on the addresses which are multiples of 2, so: 0, 2, 4, and so on…<br />
                    A 4 byte variable will only go on the addresses which are multiples of 4, so: 0, 4, 8 and so on...<br />
                    A 8 byte variable will only go on addresses 0, 8, 16 and so on....<br />
                </p>
                <p className="blogParagraph">
                    And you can apply this exact rule to data structures, so in our “Example” class the char is a single byte and it can go at the first memory address available (which we'll call 0), but the int can't go to the next address in memory, it needs to be on the next aligned boundary, which is 4. The int is four bytes in size so it takes up 4 addresses in memory. The next available slot is 8 which is aligned for the 2 byte short, so 8 and 9 are occupied by the short.
                </p>
                <pre>{`
                    0: char
                    1:
                    2:
                    3:
                    4: int
                    5: int
                    6: int
                    7: int
                    8: short
                    9: short
                    `}
                </pre>
                <p className="blogParagraph">
                    So address 1, 2, 3 are padded, which is to say they are skipped over in the data structure so that the int can go to the aligned boundary at memory address 4. But wait... 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 makes only 10 bytes, and we know an object of class Example is 12 bytes. The 2 extra bytes actually occur because the class object itself has to be padded, not just the variables within it. This padding is just padding up to BUT NOT INCLUDING the next byte aligned boundary for the largest type size in the object, for example: the largest type size here is 4 bytes (int), so we need to pad up to (again, but not including) the next address which is a multiple of 4: 12. Hence memory addresses 10, 11 are now padded, therefore objects of class Example are 12 bytes.
                </p>
                <p className="blogParagraph">
                    What you might have already realised is that padding is completely dependent on the order in which the class's variables are defined, and as such we can reduce the size of this object without taking away any variables.
                    <br />
                    If we define it like so, changing the order of variable definitions:
                </p>
                <pre>
                    {`
                    class Example
                    {
                        short z; //short = 2 bytes
                        char y; //char = 1 byte
                        int x; //int = 4 bytes
                    };
                    `}
                </pre>
                <p className="blogParagraph"> Memory allocation would look like this: </p>
                <pre>
                    {`
                    0: short
                    1: short
                    2: char
                    3:
                    4: int
                    5: int
                    6: int
                    7: int
                    `}
                </pre>
                <p className="blogParagraph">
                    Objects of class Example are now only 8 bytes! We've cut a ⅓ of memory usage this way without losing any actual information. Be aware that you can turn on 'packing' for your compiler to avoid padding and store the class objects as 7 bytes regardless of the order of the class, which would save 1 byte of memory in this case, however padding exists for performance reasons: object members on aligned boundaries are quicker to read and write for the OS.
                </p>

                <h1 className="blogSubheader">Byte size booleans</h1>
                <p className="blogParagraph">
                    Moving on to the next tip, a char is a byte, and a char can represent 256 values (0-255).
                </p>
                <p className="blogParagraph">
                    A bool is ALSO 1 byte and it can only be 0 or 1 (true or false). So why is the char type capable of storing 256 states, and another type is only capable of storing 2 states, when they are both the exact size in memory?
                </p>
                <p className="blogParagraph">
                    A byte is 8 bits. A bit is just a <strong>b</strong>inary dig<strong>it</strong>. So a byte can be represented as (e.g.) 01101011. 8 bits allow for 2 to the power of 8 (256) unique values. A true bool would only be 1 bit because it only needs to deal with 2 values: true or false, 1 or 0. However, your modern operating system (regardless of which one you're using) cannot address anything less than 1 byte. Which means: although a bool in a perfect world is 1 bit, in our world it must be 1 byte.
                </p>
                <p className="blogParagraph">
                    This has some interesting implications, such as for my project <a style={{color: "blue", textDecoration: "underline"}} href="/stenor/stenor.html" target="_blank" rel="noopener noreferrer">Stenor</a>: the whole reason why steganography like in Stenor is even possible is because the byte is the minimum. As I mention through that link, for an image you only really need 6 bits per colour channel because any higher level of detail isn't noticeable, but since the minimum is a byte, it has to be 8 bits per channel, and so we can use the last 2 bits to secretly store data, safe in the knowledge that changes to the last 2 bits just aren't noticable. In a perfect world we would use image formats with only 6 bits per channel and therefore images would be 25% smaller in size and this kind of steganography wouldn't be possible, but we live in an imperfect world.
                </p>

                <h1 className="blogSubheader">Addressing memory, and how big is a pointer?</h1>
                <p className="blogParagraph">
                    I've written “addressing memory” a few times so far, but what exactly does it mean? You can think of how the OS deals with memory as a large array - this is a little oversimplified, but it gets the point across - and the smallest amount of addressable memory is a byte.
                </p>
                <p className="blogParagraph">
                    An index of this array is a memory address, and addressing memory more or less means pointing to bytes from this “byte array” by specifying the index. The index/memory address is a number. In a 32bit system, it's a number that can be up to 32 bits long. 2³² is 4294967296, so it stands to reason that a 32bit system can index up to 4294967296 bytes (which is 4GB) - this is the reason why 32bit operating systems don't benefit from having more than 4GB of RAM - the index just doesn't go high enough (bear in mind it is actually a little more complicated and has to do with CPU architecture). In a 64bit system, the limit is 2⁶⁴ bytes, or about 17 billion GB.
                </p>
                <p className="blogParagraph">
                    If this index/memory address is a value itself and a pointer has to be able to record a memory address, therefore in a 32bit system the pointer has to be 32 bits long in order to be able to address the entire possible byte array, or 64 bits to be able to address the entire byte array on a 64bit system. So to the question “how big is a pointer?”, the answer is 'the same size as the memory address': 32 bits (4 bytes) on a 32bit system and 64 bits (8 bytes) on a 64bit system.
                </p>

                <h1 className="blogSubheader">How files are read by text editors, and endianness</h1>
                <p className="blogParagraph">
                    When we write data to a file (regardless of what that data is) and then open the file in a text editor, the text editor reads the file as a series of bytes (or chars). A char is just a numerical value and when chars are parsed (either by the terminal output or by the text editor), it just uses an encoding table to find out what ‘letter' each numerical value represents.
                </p>
                <p className="blogParagraph">
                    You have to take this encoding table it into account when you're writing data to a file that the user should be able to open and read in a text editor (this is called Human-Readable format). Encoding is everything in readable data for computing, and it is incredibly important for the internet that everybody follows a standard.
                </p>
                <p className="blogParagraph">
                    An encoding like ASCII is fairly simple, it just checks the value of each byte against the encoding table, but other encodings can be more complex, such as a 'wide' letter being 2 bytes, where every 2 bytes is parsed by the text editor and checked against an encoding table with 2¹⁶ (~65,000) possible aliases. Using 2 bytes would therefore allow for many more different letters to be used, but also takes up twice as much disk space, and even still 2 bytes isn't even really enough to cover all of the special ©ℏǡɌɅςτϵɌŠ that one might encounter whilst, say, browsing the internet (for those of you using some kind of weird device/browser that doesn't have the de facto standard UTF-8 encoding, you're probably seeing a bunch of squares in the middle of this sentence - or otherwise error characters - so all in all it's a successful lesson in why standard character encoding is important).
                </p>
                <p className="blogParagraph">
                    UTF-8 is the defacto standard for a reason. I'm not going to talk much about it but UTF-8 encoding is special because it allows a letter to be encoded as 1, 2, 3, or 4 bytes long. And of course, to be efficient the most common characters are encoded as 1 byte, the less common characters are 2 or 3 bytes, and the rare characters that you probably aren't going to encounter once in 10 years are 4 bytes. With up to 4 bytes per character UTF-8 therefore has space for all the characters needed so that you don't have to worry about seeing missing-character squares in place of exotic letters, but since the most common characters are only 1 byte it still manages to be memory efficient: the best of both worlds.
                </p>
                <p className="blogParagraph">
                    Now consider (and feel free to compile and try) the following code:
                </p>
                <pre>
                    {`
                    int main()
                    {
                        int num = 1685221239;
                        std::ofstream foutstream;
                        foutstream.open("./output.txt", std::ios::binary);
                        foutstream.write((char*)&num, sizeof(int));
                        foutstream.close();
                    }
                    `}
                </pre>
                <p className="blogParagraph">
                    If you use it and go read the .txt file you'll notice it says “word” despite the fact that the code  outputted an int to the file. So what's going on? Well the text editor (as I wrote above) interprets each byte of the file against an encoding table. The int is 4 bytes long, so it's not a coincidence that we see four letters when we open the .txt file with our text editor.
                </p>
                <p className="blogParagraph">
                    The int represents a value of 1685221239, If we interpret this in binary (as the 32 bits) we get:
                </p>
                <pre>
                    {`
                    01100100 01110010 01101111 01110111
                    `}
                </pre>
                <p className="blogParagraph">
                    Take these 32 bits and break them into 4 blocks of 8 bits (4 bytes) these 8 bit numbers convert to decimal as 100, 114, 111, 119 respectively, which as per the <a style={{color: "blue", textDecoration: "underline"}} href="https://www.utf8-chartable.de/unicode-utf8-table.pl?utf8=dec&unicodeinhtml=dec&htmlent=1" target="_blank" rel="noopener noreferrer">UTF-8 encoding table</a> comes to d,r,o,w (we'll get to why it's backwards for ‘word' in a moment).
                </p>
                <p className="blogParagraph">
                    Whether we write an int, 4 chars, or 2 shorts to a file doesn't matter, because 'variables' are a concept that only compilers care about. All programs really care about is memory, and the text editor only knows there are 4 bytes. But why is it backwards? Why is the above example d,r,o,w as we convert each byte of the int, but ‘word' in the text editor? Because if you're using any modern consumer/home OS, your OS is ‘little endian'.
                </p>
                <p className="blogParagraph">
                    Endianness is the order in which bytes are written to memory/storage, 'big endian' order is essentially the order you would expect, but little endian order writes bytes backwards. Note that only bytes are written backwards, the variable order is the same and the bits within each byte are the same.
                </p>
                <p className="blogParagraph">
                    For example, say we have 3 variables, A B and C of 2 bytes (or 16 bits) each.
                </p>
                <pre>
                    {`
                    A = 11010100 11110100
                    B = 11111100 00011010
                    C = 00100000 10101010
                    `}
                </pre>
                <p className="blogParagraph">
                    With these variables in an object in this order {`{A, B, C}`}, and then we write this object to a file, it will be written in that same order A,B,C, because endianness does not affect the order of variables.
                </p>
                <p className="blogParagraph">
                    And the contents of each variable are not simply reversed, only the bytes within each variable are in reverse order, the bits within each byte stay the same, so A does NOT get written as:
                </p>
                <pre>
                    {`
                    00101111 00101011
                    `}
                </pre>
                <p className="blogParagraph"> But instead as...</p>
                <pre>
                    {`
                    11110100 11010100
                    `}
                </pre>
                <p className="blogParagraph">Overall, writing the object containing A,B,C to a file would result in this order in the file:</p>
                <pre>
                    {`
                    A = 11110100 11010100
                    B = 00011010 11111100
                    C = 10101010 00100000
                    `}
                </pre>
                <p className="blogParagraph"> The order of variables is conserved, the order of bytes within each variable is reversed, the order of bits within each byte is conserved. It's like receiving post in your letterbox, in which the paragraphs are in the correct order, but each sentence is reversed ("dog. lazy the over jumps fox brown quick The"), even though the words are still correctly ordered ("the" instead of "eht").
                </p>
                <p className="blogParagraph">
                    And that's why I defined the int with a value equivalent to “drow”, knowing it would be “word” when opened in a text editor. It's worth mentioning that in practice, endianness is not something you should ever have to worry about, because if you are storing human-readable data you will store it as a string. A string is just a series of chars, so you are really storing just chars. If you are storing or sending data as just chars, endianness does not matter; firstly, as you just read 3 sentences ago, the order of the variables (chars) won't change; and secondly, a char is 1 byte, and you can't change the byte order of a variable that only has 1 byte in it, so a string is completely unaffected by endianness.
                </p>
                <p className="blogParagraph">
                    And even if you aren't storing string data, then endianness still doesn't matter, because if you're writing raw non-human readable data, the only point of raw data is for it to be read by a program later on… and when the program reads the data, if you're on a little-endian OS it will expect the data to be stored in little endian (therefore it will automatically put it into the order you would expect as it reads the data).
                </p>
                <p className="blogParagraph">
                    The only time endianness becomes an issue is transmitting data over the internet, where the recipient might be using a big-endian OS (data centers often use big-endian OS's for performance reasons that I'm not gonna go into here). This problem is dealt with by just sending data over in a string format (as already discussed strings are not affected by endianness), and for exactly that purpose, data sent over the internet is converted to strings and handled by formats like JSON.
                </p>

                <h1 className="blogSubheader">Storing a char instead of 8 booleans</h1>
                <p className="blogParagraph">
                    Above I wrote that a char contains 1 byte, or 8 bits, and a bit is a true boolean with only two values, but the bool type is also 1 byte. Well let's say for whatever reason you are storing a very large array, and each element of the array contains many booleans. A case for this could be a video game, where you are storing the rules and properties for every item in the game in a file that doesn't need to human-readable. Let's say your game has various different items, and there are 8 true/false properties for each item (e.g. bool isQuestItem = true;). When loaded into memory it is ideal to have those true/false properties as bools, so that they can be immediately referred to in conditionals for true/false, however when storing these items in a file on the disk, they can be stored in compressed format that reduces the game's disk size. There are many ways to compress, and one way to compress booleans is to group up to 8 booleans together into a char variable.
                </p>
                <p className="blogParagraph">
                    The logic is simple: a char is 8 bits, and we can consider that each bit can be 1 for true, 0 for false, so with that specified we can go ahead and store our 8 bools in a single char, which results in storing 1 byte instead of 8. The 8 bools now take up only 12.5% of the storage space that they used to, and the method for doing this is rather trivial (simple bit shifting).
                </p>
                <h1 className="blogSubheader">Conclusion</h1>
                <p className="blogParagraph">
                    Well, that concludes all of my memory tips. Thanks for reading and hopefully you learned a few things here  (and hopefully a few of you even stopped mid way through to reorder variables in your class definitions for more efficient padding).
                </p>
            </PageEntry>
        </Page>
    );
}