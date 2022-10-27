# 📦 React headless accordion
React-headless-accordion is a set of simple components ready to be inserted into your project. These unstyled components allow you to make a nested chord that matches the style you want.

##  Features
- ✅ Infinite nesting of the accordion
- ✅ Customization of the accordion style
- ✅ Accordion elements remain open when another element is open (Optional).
- ✅ Default opening of some element (Optional).
## Why ❔
An accordion with the above characteristics is above all indispensable in many projects. It will be useful on a project where you have to make an accordion from scratch.

With react-headless-accordion we only focus on the style of the accordion rather than implementing all that logic.

<p align="center">
<img src="https://raw.githubusercontent.com/onesine/react-nested-accordion/master/assets/img/Screen_Shot_2022_10_21_at_12.12.47.png" alt="preview react-headless-accordion">
</p>

## Examples of online usage
You can find examples of use at [here](https://demo-react-tailwindcss-select.vercel.app/)

## Install
You can use yarn
```bash
yarn add react-headless-accordion
```
Or via npm
```bash
npm install react-headless-accordion
```
Make sure you have installed the peer dependencies as well with the below versions.
```
"react": "^18.2.0"
```

## Usage
This component also exports a tiny CSS file built by tailwind. All CSS classes used in designing and customizing the select component are all custom tailwind classes which ensures that an existing tailwind project would not need to include this CSS file again.

### Basic example

The accordion is built using the components `Accordion`, `AccordionItem`, `AccordionHeader` and `AccordionBody`.

Clicking on `AccordionHeader` will automatically open the `AccordionBody` with a transition.

```jsx
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";

const App = () => {
    return (
        <Accordion>
            <AccordionItem>
                <AccordionHeader>
                    <h3 className={`accordion-title`}>Title 1</h3>
                </AccordionHeader>

                <AccordionBody>
                    <div className="accordion-body">
                        Lorem ipsum dolor sit amet.
                    </div>
                </AccordionBody>
            </AccordionItem>

            <AccordionItem>
                <AccordionHeader>
                    <h3 className={`accordion-title`}>Title 2</h3>
                </AccordionHeader>

                <AccordionBody>
                    <div className="accordion-body">
                        Lorem ipsum dolor sit amet.
                    </div>
                </AccordionBody>
            </AccordionItem>
        </Accordion>
    );
};

export default App;
```

### Styling different states
Each `AccordionItem` exposes an `open` variable about its current state via render props that you can use to conditionally apply different styles or render different content.

```jsx
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";

const App = () => {
    const data = [
        {title: "Title 1", content: "Lorem ipsum dolor sit amet."},
        {title: "Title 2", content: "Lorem ipsum dolor sit amet."},
        {title: "Title 3", content: "Lorem ipsum dolor sit amet."},
    ];
    return (
        <Accordion>
            {data.map((item, index) => (
                <AccordionItem key={index}>
                    {({open}) => (
                        <>
                            <AccordionHeader>
                                <h3 className={`accordion-title ${open ? 'accordion-active' : ''}`}>{item.title}</h3>
                            </AccordionHeader>

                            <AccordionBody>
                                <div className="accordion-body">
                                    {item.content}
                                </div>
                            </AccordionBody>
                        </>
                    )}
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default App;
```

### Rendering a different tag for accordion components
By default, the components provided by react-headless-component except `AccordionItem` have a default tag. But you can change them.

| Components        | Default Tags |
|-------------------|--------------|
| `Accordion`       | `div`        |
| `AccordionHeader` | `button`     |
| `AccordionBody`   | `div`        |

If you want to change the tag of one of the react-headless-accordion components you can use the Props as.
#### Example `AccordionBody`

```jsx
<AccordionBody as={"ul"}>
    Lorem ipsum dolor sit amet.
</AccordionBody>
```

### Styling accordion
All components exposed by react-headless-accordion except `AccordionItem` offer a Props className to style them.

#### Example using Tailwindcss
```jsx
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import {Chevron} from "../components"

const App = () => {
    return (
        <Accordion>
            <AccordionItem>
                {({open}) => (
                    <>
                        <AccordionHeader className="w-full flex items-center text-gray-600 border-b p-4">
                            <Chevron
                                className={`w-7 h-7 transform transition duration-300 ${!open ? '' : ' rotate-90'}`}
                            />

                            <span className="ml-2">Title 1</span>
                        </AccordionHeader>

                        <AccordionBody>
                            <div className="px-4">
                                Lorem ipsum dolor sit amet.
                            </div>
                        </AccordionBody>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};

export default App;
```

## Contributing
Got ideas on how to make this better? Open an issue!

## Thanks
These components are inspired by the react version of headlessui [headlessui](https://headlessui.com/).

I thank you in advance for your contribution to this project.

## License
MIT Licensed. Copyright (c) Lewhe Onesine 2022.
