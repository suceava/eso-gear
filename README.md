# ESO Gear Builder

Create an ESO character build

## Development
This `/scripts` folder contains scripts that may need to be run one time to generate an initial list of sets.

The `generateSetsList.mjs` script can be run to both fetch the data from the website and generate the inital list of sets, or to load the existing script/data file and update stats/info based on already fetched data.  This can be done by setting the `CRAWL_SITE` variable value accordingly. (This is done so that the data doesn't have to be fetched every time).


### Icons
To extract the icons from the game files, run the [EsoExtractData](https://en.uesp.net/wiki/Online_Mod:EsoExtractData) tool.
- copy the `ESO/The Elder Scrolls Online/depot` folder
- run the tool against that folder
  ```PowerShell
  .\EsoExtractData.exe .\depot\eso.mnf -m .\mnf\eso\eso.txt -z .\mnf\eso\zosft.txt
  ```
- open the `zosft.txt` file to find where the icons are located in the extracted folders

All the gear and relevant icons should be in the `\esoui\art\` folder.

To convert the `.dds` files to `.png`, download and run the [XnConvert](https://www.xnview.com/en/xnconvert/) tool, which is free for personal use.

