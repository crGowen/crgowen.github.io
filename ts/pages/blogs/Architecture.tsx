import Page, { PageEntry } from "../../Page";
import x1000m from '../../../img/blog/arch/x1000m.png';
import x200m from '../../../img/blog/arch/x200m.png';
import x30m from '../../../img/blog/arch/x30m.png';
import x5m from '../../../img/blog/arch/x5m.png';

export default function Architecture() {
    return (
        <Page width="normal">
            <PageEntry>
                <h1 className="blogHeader">
                    CPU architecture, and which variable size is actually fastest for arithmetic?
                </h1>
                <p className="blogParagraph">
                    It is tempting to think of all variables as purely mathematical in nature, insofar that we should just use the smallest-size appropriate variable for our task, but this would be incorrect. The architecture
                    of hardware is a deep and interesting topic by itself, and it makes a significant difference to performance: I would argue in fact, that in some cases with a heavy emphasis on performance it should be one of the primary considerations for a programmer making a variable choice.
                </p>

                <h1 className="blogSubheader">
                    'Simple' variable choice
                </h1>
                <p className="blogParagraph">
                    Nearly a decade ago when I first started to learn the basics of programming, it occurred to me that all the for loops in my 'learn C++' book were written with (32 bit) int variables, despite the fact that many examples did not
                    go beyond 100 iterations. Naturally, I thought I was clever when I wrote my first programs using 8 bit variables as the iterator for my sub-256 iteration loops, and shorts for pretty much all the rest (back then I never once
                    required iterating beyond a few thousand iterations). 
                </p>
                <p className="blogParagraph">
                    The trouble was, however, that I was entirely wrong: using anything other than 32 bit variables actually incurred a performance overhead, since the compiler would put the iterator variable into a CPU 'register', which is sensible - except there was a performance penalty because an 8 or 16 bit variable doesn't match the size of the 32 bit register.
                </p>
                <p className="blogParagraph">
                    As an aside, young-me replaced my 32 bit iterator with an 8 bit alternative in order to save memory. A whole 3 bytes of memory per for loop! As far as optimisations go, it was absolutely pointless outside of making me feel clever and smug.
                </p>
                <p className="blogParagraph">
                    The short thing to take away from this, is that choosing a variable requires some thought about the CPU architecture: in that anecdote there was a performance penalty for doing any arithmetic on non-32 bit variables, which meant
                    in many situations (when memory usage is not a worry; when many mathematical operations need to be performed) it was wise to consider the trade off between optimising memory usage vs optimising CPU time, by just using a 32 bit variable over a smaller one.
                </p>
                <p className="blogParagraph">
                    The long thing to take away is the rest of this post. Of particular interest to me is that the realisation shared above occured nearly 9 years ago: things are different now, and most notable is that I now have a 64 bit processor on a 64 bit operating system... so should I still use
                    32 bit arithmetic by default, or is it time to use 64 bit variables?
                </p>

                <h1 className="blogSubheader">
                    CPU architecture
                </h1>
                <p className="blogParagraph">
                    The answer is complicated, so first let's talk about what a CPU actually looks like. The most important part of each CPU core is the ALU (arithmetic and logic unit). As the name suggests, it is the mathematical brain of a CPU core. The ALU takes inputs into an operation (like add, multiply, etc.) and returns the output. What you might already realise is that the operation itself
                    is not exactly an input. If the operations that an ALU can do are not inputs, they are part of a core itself, and indeed they are built into the circuitry of the core (known as the instruction set implementation).
                </p>
                <p className="blogParagraph">
                    Each CPU core has registers, which are tiny blocks of memory used for storing the data for the ALU to access quickly, the size of a register is generally
                    equal to the word size. The word size is how many bits a CPU core can deal with in a single operation, and it also affects how many addresses in memory the CPU can deal with.
                    These days, you will likely see 32 bit and 64 bit word size CPUs more than anything else. What is interesting however, is the word size is not the maximum bits a CPU can deal with, it is simply <strong>how many</strong> bits the CPU deals with at a time: essentially a 64 bit CPU needs to always deal with 64 bits, if you pass into it
                    a 32 bit variable, it will be converted to a 64 bit word before the operation takes place (by preceeding the variable with 32 zero bits). But of course, this means there can be a performance overhead to using 32 bit variables on a 64 bit system (this performance overhead is however, tiny, since compatibility is a large consideration for the design of modern CPUs).
                </p>
                <p className="blogParagraph">
                    The next part of a CPU core is the cache: accessing the RAM is relatively slow, so CPUs will typically
                    bring variables into their cache and work on them. Think of it like this: a register is your offhand that you can not store much in but you can access it nearly instantly - a cache is a tool belt around your waist that you can access very quickly, the RAM is the toolbox which takes some time to open but is still acceptable, and the storage drive is like tools that are still stored in the cupboard (if you need to use extremely large amounts of memory the storage drive can step in to help... but doing this is glacially slow - usually when this happens it is refered to as 'using the page file' - and it's important to say the pagefile isn't actually used as memory, it's a little more complicated than that, but that's another topic).
                </p>
                <p className="blogParagraph">
                    Each CPU core will have its own cache, and
                    will also have access to the 'last level cache', which is a special cache shared by all cores of the CPU, the last level is the slowest type of cache, but compensates for it being being much larger in capacity. The shared cache can be useful as a spill-over memory pool that is not quite as slow as RAM,
                    but is also necessary for multi-core CPUs: if each core takes a part of a problem and they need to periodically sync up their operations (known as a 'memory fence/barrier'), since they don't have access to each others' caches, they can instead use the shared cache to copy and compare data. What's important to note here is that, since each core has its own cache, using multi-threading is useful not just because of multiple threads solving a problem, but also because it means effectively having more cache! But unfortunately not all problems are parallelisable. 
                </p>
                <p className="blogParagraph">
                    All in all, each CPU core has its ALU with the circuitry for the instruction set implementation, registers for extremely quick access to tiny amounts of memory, as well as a small cache for fast-access to a larger amount of memory, then the CPU overall has a much larger last-level cache shared between all cores, finally, the CPU can interact with RAM via the memory bus (which is extremely slow). All of these factors influence the performance of programs, and if you are trying to squeeze and optimise every last drop
                    from the CPU, then they need to be considered.
                </p>

                <h1 className="blogSubheader">
                    Performance tests
                </h1>
                <img className="fullWidthImg" src={x1000m} />
                <p className="blogParagraph">
                    Starting of with a vector size of 1 billion, we immediately see that 64 bit is shown to have the best performance in arithmetic, but loses overall due to how much longer it takes to simply instantiate the vector of 64b integers. From this first result it can already be clearly seen that in applications where one integer can be continuously cached in the CPU and is greatly involved in calculations, 64b is the way to go. But where memory usage and instantiation are concerned, 64b places clearly last. It can also be seen that the cost of instantiation is directly proportional to the size of the integer: the 8b integer vector takes ~300 clocks, and the 64b integers (being 8x the size) take just over 8x the clocks for instantiation.
                </p>
                <img className="fullWidthImg" src={x200m} />
                <p className="blogParagraph">
                    With a vector size of 200 million integers, we see a similar pattern. Although the differences in performance overall are much smaller (as expected due to the smaller size of the vector), and the instantiation costs are not quite so exactly proportional to integer size here.
                </p>
                <img className="fullWidthImg" src={x30m} />
                <p className="blogParagraph">
                    The same trend continues as we continue to decrease the size of the vector. At this point, it needs to be said that the data became somewhat noisy, despite the fact that the tests were performed several times for each configuration of vector size and integer size. As the number of clocks taken gets smaller the noise in the data gets worse. This is to be expected, since the CPU is not just running this test, any of the other programs and services running on my PC have their effect on the CPU's cache and try to slot their jobs into the CPU's clock cycles. For tests of a larger scale the fluctuations caused by this might alter result values by, say, 2%, but as the scale of the test becomes smaller the same fluctuation could represent a change of, say, 10% - becoming much more apparent.
                </p>
                <img className="fullWidthImg" src={x5m} />
                <p className="blogParagraph">
                    Finally, at a vector size of 5 million, the trend stays true. Notice that although performance levels out overall, the differences in time taken for arithmetic have actually gotten more pronounced. With 5 million integers we see that the arithmetic on 64b is now nearly 2x as fast the 8b integer (though again, bear in mind that data noise is very significant now). It is also worth noting that performance at only 5 million integers was harder to measure than the others: I kept needing to flush the cache, since clocks taken would get progressively much much lower after each repeated run - which shows something quite important - even at a vector size of 5 million (which is no small size by any means!) the cache was becoming enough of a factor to significantly affect results, and it affected results mainly by significantly improving 64b performance. In a practical sense, this means 64b is the obvious choice for your code if the data size is small enough to remain in the cache and is going to get reliably cache-hit.
                </p>
                <p className="blogParagraph">
                    As a quick side note, I did also test vector sizes of more than 1 billion, however above 1 billion the 64b integers consumed so much memory that the page file was being used. Naturally this made 64b peformance the worst by a laughably large margin, so another benefit to smaller sizes is that you can fit more of them into RAM before the page file is required (although this is extremely obvious, no?).
                </p>

                <h1 className="blogSubheader">Conclusions</h1>
                <p className="blogParagraph">
                    When considering which variables to use where, the principle concerns are always a trade-off between memory and CPU time, but memory has its own impacts on CPU time - less data streaming to the CPU can mean better performance, and using less data can mean lower chances of cache misses, granting further performance gains.
                    Whether or not you will need to use a lot of memory and whether or not your problem can be parallelised (which would increase the importance of cache especially, as well as increase performance overall) should be the first questions. In general, 64 bit integers on x64 are the best performance if you are only using a very small number of variables and all those variables can be reliably in the registers and/or cache. As an aside, the noticably poor performance of 16 bit integers in this test was a surprise,
                    and it requires more research to be sure, but in the meantime I will certainly be less inclined to use them. 
                </p>
                <p className="blogParagraph">
                    These results produce more of a guide than hard rules. The arithmetic here was primarily modular and the performance costs are sure to be different enough for other types of arithmetic that it could tip the results. As with all optimisations, when you really need every bit of optimisation for a solution, it pays to examine in detail where the performance is lost, and experiment. For that there is no substitute for using a competent profiler (there's likely a decent one with your IDE), additionally your compiler might provide the ability to compile into assembly instead of machine code, if you are familiar with assembly and think you can do a better job than the compiler, you could make significant impacts on performance before assembling into machine code.
                </p>
                <p className="blogParagraph">
                    It also needs to be said that micro-optimisations shouldn't always be considered important at all: if you optimise a function within your program that barely affects the user experience and it takes you a day of work to do, you've arguably wasted time which you could have spent doing much more impactful things; on top of that your optimisation may have made the code harder to work with while the application is still being developed, slowing down everyone's progress. As the saying goes: 'premature optimisation is the root of all evil', unless you are thinking about the core flow and data structures within your program, optimisations can usually be considered late and only where and when they are actually needed.
                </p>
                <p className="blogParagraph">
                    Ultimately, it does indeed seem to be worthwhile to use 64 bit integers in certain situations so long as the trade offs are properly considered. These results are valid for my system, running the Intel64 architecture - your mileage may vary and you might have slightly different insights from your own test and perspective. The source code for the tests can be found below.
                </p>

                <h1 className="blogSubheader">Test Code</h1>
                <pre>{`
                #include <iostream>;
                #include <time.h>
                #include <vector>

                #define integerVar unsigned __int64 // __int8, ..., __int64 :: CHANGE THIS TO CHANGE INTERGER SIZE
                #define vecSize 5000000             // 1000m, ..., 5m       :: CHANGE THIS TO CHANGE VECTOR SIZE

                int main()
                {

                    clock_t timer = clock();

                    std::vector <integerVar> vec (vecSize);

                    // explicitly declare to prevent the compiler from using variable type of its own choice
                    integerVar modularVar = 0;
                    integerVar setWidth0 = 0;
                    integerVar setWidth3 = 3;
                    integerVar setWidth5 = 5;
                    integerVar setWidth7 = 7;

                    timer = clock() - timer;

                    std::cout << "CPU time (init): " << timer;

                    for (unsigned __int32 i = 0; i < vecSize; i++) {
                        if (modularVar % setWidth3 == setWidth0) vec[i]++;
                        if (modularVar % setWidth5 == setWidth0) vec[i]++;
                        if (modularVar % setWidth7 == setWidth0) vec[i]++;

                        modularVar++;
                        modularVar %= 220;
                    }

                    timer = clock() - timer;

                    std::cout << "\\nCPU time (arith): " << timer;
                }
                `}
                </pre>
            </PageEntry>
        </Page>
    );
}