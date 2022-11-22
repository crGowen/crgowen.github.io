import Page, { PageList, PageEntry } from "../../Page";

const items = [
    {
        title: "What is Stenor?",
        description: `Short for "Steganographer", Stenor is a hobby project on digital steganography, imitating the cyber-spy thriller cliché of secretly storing data inside of data.
        Stenor allows you to encode files into a container image, generally without changing the container in a way noticeable to the naked eye.
        The files encoded into the container can be any type from .txt to .exe to .zip files (just for fun you could encode a copy of Stenor into an image using Stenor, and in the case of heavily compressed JPG's, you can even sometimes encode the image into itself).`
    },
    {
        title: "How does it work?",
        description: `In a typical image, each colour channel of each pixel is 8 bits, a typical RGB pixel has the three colour channels Red, Green, and Blue,
        so could be therefore represented as three 8 digit binary numbers, for example:  [10101110, 11101100, 00011101] - equivalent to a colour hex of AEEC1D, or lime green.
        If we change the last 2 bits of each channel, [101011xx, 111011xx, 000111xx], the difference in colour is basically impossible to notice,
        for example [10101100, 11101100, 00011100] represents a colour hex of ACEC1C (open up paint/photoshop and compare AEEC1D to ACEC1C, see if you can tell the difference).
        This all means we can use those least significant bits to store data, in that example we used the 6 least significant bits to store "000000",
        but we could just as easily have stored "101111" or any other series of 6 bits. In total therefore, we can store 6 bits of data in every pixel of an RGB image,
        that might not sound like a lot, but considering a 1920x1080 picture has more than 2 million pixels, it means we can store 12 million bits (or 1.5 million bytes) of data in a single 1080p image.`
    },
    {
        title: "How to use",
        description: `Stenor is a hobby project and little effort has been put into compatibility, as such the only valid container formats are .jpg and .png, HOWEVER these limitations are only for the container file when encoding, the file that is encoded into the container can be literally anything, from .txt to .jpg to .exe to .zip, or even an arbritary one you invent on the spot. Do not use Stenor to store personal information, it is not intended to be anything other than a
        hobby project and curiosity, it does not encrypt information in any way that would make it resistant to prying eyes (given that softwares to detect and read steganographed data exist).`
    }
];

const itemsJSX = items.map( x => ({
    jsx: (<>
    <h1 style={{
            fontWeight: "normal",
            fontSize: '1.4rem',
            marginBottom: '0.2rem'
        }}>{x.title}</h1>
    <p style={{
            fontWeight: "normal",
            fontSize: '0.9rem'
        }}>{x.description}</p>
    </>)
}));

export default function Stenor() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
            <PageEntry>
                <h1 style={{
                fontWeight: "normal",
                fontSize: '1.4rem',
                marginBottom: '0.2rem'
                }}>
                    Download
                </h1>
                <p style={{
                fontWeight: "normal",
                fontSize: '0.9rem'
                }}>
                    <a style={{color: "steelblue", textDecoration: "underline"}} href="https://github.com/crGowen/Stenor/releases/tag/2.0.0" target="_blank" rel="noopener noreferrer">Version 2.0.0 (.zip) / Windows x64</a>
                </p>
            </PageEntry>
        </Page>
    );
}