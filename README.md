## Up (ultimate popup)
Ultimate popup was developed to provide a lightweight versitial popup library. Featuring dragable windows with snap magnetic window alignment, multi sized popups, tabable windows, cancelable overlay, and more.

### Options {}
Avalible options to customize the popup, options is a json object passed to the Up.open function.
- **size**: string (small/medium/large/content-driven) **Default**: empty string,
- **title**: string (title of popup) **Default**: empty string,
- **multiTab**: Bool (true/false) **Default**: true,
- **dragable**: Bool (true/false) **Default**: true,
- **overlay**: Bool (true/false) **Default**: false,

### open( content, options, callBack )
This method creates and opens a new popup it takes three arguments content, options, and callBack.
#### Example:
```javascript
Up.open( content, options, callBack );
```
### closePopup( popup )
This method closes a given popup, if popup is not given it will close the active popup.
#### Example:
```javascript
Up.closePopup( popup );
```
### closeAll( popup )
This method closes all popups.
#### Example:
```javascript
Up.closeAll( popup );
```
### openWindow( popup )
This method opens a minimized popup.
#### Example:
```javascript
Up.openWindow( popup );
```
