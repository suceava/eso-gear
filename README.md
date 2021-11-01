# ESO Gear Builder

Create an ESO character build

## Development
This `/scripts` folder contains scripts that may need to be run one time to generate an initial list of sets.

The `generateSetsList.mjs` script can be run to fetch the data from the website and generate the inital list of sets.  The script generates a file called `eso-sets.mjs` which will need to be copied to `/src/data/` folder and changed to a json file called `eso-sets.json`.

The `updateSetsList.mjs` script can be run to update the data in the sets list, code can be added here for any new modifications.

The `copySetIcons.mjs` script can be run to copy the images referenced in the sets list file to the proper folder.


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

