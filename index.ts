import alfred, {OutputItem} from "@liangshen/alfred";
import plist from 'bplist-parser';
import os from 'os'

// await run(() => {
//     let application = Application('ITerm');
//     application.createWindowWithProfile('118.31.122.16-新平台-后端-001');
// })

var obj = await plist.parseFile(`${os.homedir()}/Library/Preferences/com.googlecode.iterm2.plist`);
const items: OutputItem[] = obj[0]['New Bookmarks'].map((i: any) => ({
    title: i.Name,
    subtitle: i.Tags.join(','),
    arg: i.Name
}));
alfred.output({
    items
}, ["title", "subtitle"]);

// const configurations = await run(() => {
//     let application = Application("Tunnelblick");
//     application.includeStandardAdditions = true;
//     const configurations = []
//     const length = application.configurations().length
//     for (let i = 0; i < length; i++) {
//         const configuration = application.configurations.at(i);
//         configurations.push({
//             name: configuration.name(),
//             state: configuration.state()
//         });
//     }
//     return configurations;
//     // 不支持
//     // return application.configurations().map(i => ({
//     //     name: i.name(),
//     //     state: i.state()
//     // }))
// });
// const items = configurations.map(i => ({
//     title: i.name,
//     icon: {
//         path: `images/${i.state === 'EXITING' ? 'EXITING' : 'CONNECTED'}.png`
//     },
//     uid: i.name,
//     arg: i.name,
//     autocomplete: i.name
// }));
// alfred.output({items}, ['title']);
