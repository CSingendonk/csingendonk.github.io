					function makePreviewBox() {
						let rb = document.getElementsByTagName("textarea")[0];
						if (rb){
			let fut = document.getElementsByTagName("header")[0].removeChild(rb);
							return};
	let box = document.createElement("textarea");
	box.style.width = "25vw";
						box.style.height = "10vh";
						box.style.backgroundColour = "white";
							box.style.display = "block";
			let fut = document.getElementsByTagName("header")[0].appendChild(box);
}
	
	function copyaTag(tag) {
		const textarea = document.createElement("textarea");
		let tagslist = document.getElementsByClassName("tagfield");
		tagslist.forEach((tag) => {});
		textarea.value = tagslist[0];
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		alert("Tag copied to clipboard: " + tag);
	}

	function calculateMaxScale() {
		const row = document.querySelector("tr");
		const rowRect = row.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const maxWidthScale = viewportWidth / rowRect.width;
		const maxHeightScale = maxWidthScale * 2;
		return maxWidthScale;
	}

	function calculateMaxHeightScale() {
		const row = document.querySelector("tr");
		const rowRect = row.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const maxHeightScale = viewportHeight / rowRect.height;
		return maxHeightScale;
	}

	function calculateMaxWidthScale() {
		const row = document.querySelector("tr");
		const rowRect = row.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const maxWidthScale = viewportWidth / rowRect.width;
		return maxWidthScale;
	}
	document.addEventListener("DOMContentLoaded", function() {
		const rows = document.querySelectorAll("tr");
		rows.forEach((row) => {
			row.addEventListener("mouseenter", function() {
				const maxYScale = calculateMaxHeightScale() / 10;
				const maxXScale = calculateMaxWidthScale();
				this.style.transition = "transform 0.2s ease-in-out";
				this.style.transform = "scale(1)";
			});
			row.addEventListener("mouseleave", function() {
				this.style.transform = "scale(0.95)";
			});
		});
	});

	function createTable(text) {
		// Split the text into lines
		const lines = text.trim().split("\n");
		// Create a table element
		const table = document.createElement("table");
		const tbody = document.createElement("tbody");
		table.appendChild(tbody);
		let r = 0;
		// Loop through each line to create table rows
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			r++;
			// Skip empty lines
			if (line === "") {
				const trd = document.createElement("tr");
				trd.style.height = "1%";
				trd.align = "center";
				trd.colspan = "all";
				const sectionCell = document.createElement("td");
				const sectionCella = document.createElement("td");
				sectionCella.textContent = lines[i + 1];
				i += 2;
				r--;
				tbody.appendChild(trd);
				sectionCella.colspan = 2;
				sectionCell.colspan = 2;
				sectionCella.align = "right";
				sectionCella.rowspan = 2;
				sectionCell.style.display = "inline-flex";
				trd.appendChild(sectionCella);
				trd.appendChild(sectionCell);
				sectionCella.style.backgroundColor = "#9510f5";
				sectionCella.style.borderRadius = "100%";
				sectionCell.style.margin = "2em";
				sectionCella.style.margin = "2em";
				trd.style.padding = "5rem";
				continue;
			}
			// Create a table row
			const tr = document.createElement("tr");
			tr.id = i;
			// Create the first cell with the tag
			const tagCell = document.createElement("td");
			tagCell.textContent = line;
			tagCell.style.maxWidth = "fit-content";
			tagCell.style.padding = "0%";
			if (line == "Section") {
				tr.name = i;
				tagCell.id = line;
			}
			const emptyCell = document.createElement("td");
			emptyCell.textContent = r;
			emptyCell.style.paddingLeft = "1%";
			emptyCell.style.paddingRight = "2%";
			tr.appendChild(emptyCell);
			tr.appendChild(tagCell);
			// Create the second cell with the line or lines directly below
			const contentCell = document.createElement("td");
			contentCell.textContent = lines[i + 1]?.trim() || "";
			contentCell.style.paddingRight = "1%";
			contentCell.style.paddingLeft = "10%";
			contentCell.align = "right";
			contentCell.colspan = 3;
			tr.appendChild(contentCell);
			// Create the fourth cell with the copy tag button
			const buttonCell = document.createElement("td");
			const copyButton = document.createElement("button");
			copyButton.textContent = "Copy Tag";
			copyButton.onclick = function copyTag(contentCell) {
				const textarea = document.createElement("textarea");
				let tagslist = document.getElementsByClassName("tagfield");
				textarea.value = line;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
				alert("Tag copied to clipboard: " + line);
				console.log("Copying tag: " + line);
			};
			buttonCell.appendChild(copyButton);
			tr.appendChild(buttonCell);
			// Append the row to the tbody
			tbody.appendChild(tr);
			// Skip the next line as it has been used for the current row
			i++;
		}
		table.id = "tableOtags";
		// Append the table to the body
		document.getElementById("chtsht").appendChild(table); // Append the table to the body and set the ID
		table.id = "tableOtags";
	}

function searchAndHighlight() {
    var searchQuery = document.getElementById("searchInput").value.toLowerCase();
    var table = document.getElementById("tableOtags");
    var rows = table.getElementsByTagName("tr");
    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
    // Reset table styles
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            var cellText = cells[j].textContent.toLowerCase();
            rows[i].id = i;
            if (cellText.includes(searchQuery)) {
                // Highlight the cell
                cells[j].style.backgroundColor = "yellow";
                // Create a result entry
                var resultEntry = document.createElement("option");
                resultEntry.textContent = i + 1;
                searchResults.appendChild(resultEntry);
            }
        }
    }
    // Only set up the event listener once
    scrolltorow(rows);
}

function scrolltorow(rows) {
    // Get references to the select element and the table
    const mySelect = document.getElementById("searchResults");
    const myTable = document.getElementById("tableOtags");

    // Clear previous event listeners
    mySelect.removeEventListener("click", scrollToSelectedRow);

    // Attach an event listener to the select element
    mySelect.addEventListener("click", scrollToSelectedRow);

    function scrollToSelectedRow() {
        // Get the selected option value
        const selectedValue = mySelect.value;

        // Find the corresponding row in the table
        let rowIndex = Array.from(rows).findIndex((row) =>
            row.textContent.includes(selectedValue)
        );

        // Scroll to or highlight the selected row
        if (rowIndex !== -1) {
            if (rowIndex <= 4) {
                rowIndex = rowIndex + 3;
            }
            rows[rowIndex - 3].scrollIntoView();
            resetTableStyles();
            rows[rowIndex].style.backgroundColor = "yellow";
        }
    }
}

function resetTableStyles() {
    // Reset table styles here
    var rows = document.getElementById("tableOtags").getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            cells[j].style.backgroundColor = "";
        }
    }
}

	let text = `Tag
Description

Basic Tags
	
<html> </html>
Creates an HTML document
<head> </head>
Sets off the title & other info that isn't displayed
<body> </body>
Sets off the visible portion of the document
<title> </title>
Puts name of the document in the title bar; when bookmarking pages, this is what is bookmarked 
<address> </address>	
	Creates address section, usually processed in italic
	<footer> </footer>
	Creates the footer section of a document

Body

<body bgcolor=?>
Sets background color, using name or hex value
<body text=?>
Sets text color, using name or hex value
<body link=?>
Sets color of links, using name or hex value
<body vlink=?>
Sets color of visited links, using name or hex value
<body alink=?>
Sets color of active links (while mouse-clicking)
<body alink=?>	
	Sets color of active links (while mouse-clicking)
<body bgcolor=?>	
	Sets background color, using name or hex value
<body link=?>	
	Sets color of links, using name or hex value
<body text=?>	
	Sets text color, using name or hex value
<body vlink=?>	
	Sets color of visited links, using name or hex value

Text Tags

<pre> </pre>
Creates preformatted text
<h1> </h1> --> <h6> </h6>
Creates headlines -- H1=largest, H6=smallest
<b> </b>
Creates bold text (should use <strong> instead)
<i> </i>
Creates italicized text (should use <em> instead)
<tt> </tt>
Creates typewriter-style text
<code> </code>
Used to define source code, usually monospace
<cite> </cite>
Creates a citation, usually processed in italics
<address> </address>
Creates address section, usually processed in italics
<em> </em>
Emphasizes a word (usually processed in italics)
<strong> </strong>
Emphasizes a word (usually processed in bold)
<font size=?> </font>
Sets size of font - 1 to 7 (should use CSS instead)
<font color=?> </font>
Sets font color (should use CSS instead)
<font face=?> </font>
Defines the font used (should use CSS instead)
<font color=?> </font>	
	Sets font color (should use CSS instead)
<font face=?> </font>	
 Sets font family
<font size=?> </font>	
	Sets size of font - 1 to 7 (should use CSS instead)
<i> </i>	
	Creates italicized text (should use <em> instead)
<strong> </strong>	
	Emphasizes a word (usually processed in bold)
<tt> </tt>	
	Creates typewriter-style text
<em> </em>	
	Emphasizes a word (usually processed in italics)
<b> </b>	
	Creates bold text (should use <strong> instead)

Links

<a href="URL">clickable text</a>
Creates a hyperlink to a Uniform Resource Locator
mailto:EMAIL_ADDRESS">clickable text</a>
Creates a hyperlink to an email address
name="NAME">
Creates a target location within a document
href="#NAME">clickable text</a>
Creates a link to that target location
href="URL">clickable text</a>	
	Creates a hyperlink to a Uniform Resource Locator

Formatting

<p> </p>
Creates a new paragraph
<br>
Inserts a line break (carriage return)
<blockquote> </blockquote>
Puts content in a quote - indents text from both sides
<div> </div>
Used to format block content with CSS
<span> </span>
Used to format inline content with CSS
<div> </div>	
	Used to format block content with CSS
<blockquote> </blockquote>	
	Puts content in a quote - indents text from both sid
<cite> </cite>	
	Creates a citation, usually processed in italics
<code> </code>	
	Used to define source code, usually monospace
<p> </p>	
	Creates a new paragraph
<pre> </pre>	
	Creates preformatted text
<br />	
	Inserts a line break (carriage return)
<h1> </h1> --> <h6> </h6>	
	Creates headlines -- H1=largest, H6=smallest
<hr noshade>	
	Creates a horizontal rule without a shadow
<hr size=?>	
	Sets size (height) of horizontal rule
<hr width=?>	
	Sets width of rule (as a % or absolute pixel length)
<hr>	
	Inserts a horizontal rule
<span> </span>	
	Used to format inline content with CSS
<textarea></textarea>
name=? cols="x" rows="y"
	Creates a text box area. Columns set the width; Rows set the height.


Lists

<ul> </ul>
Creates an unordered list
<ol start=?> </ol>
Creates an ordered list (start=xx, where xx is a counting number)
<li> </li>
Encompasses each list item
<dl> </dl>
Creates a definition list
<dt>
 Precedes eachdefintion term
<dd>
 Precedes eachdefintion
<li> </li>	
	Encompasses each list item
<ol start=?> </ol>	
	Creates an ordered list (start=xx, where xx is a counting number)
<ul> </ul>	
	Creates an unordered list
<dl> </dl>	
	Creates a definition list
<dt>	
	 Precedes eachdefintion term
<select name=?> </select>	
	Creates a pulldown menu
<menu></menu>
	Menu option container
<option>	
	Sets off each menu item

Graphical

<hr>
Inserts a horizontal rule
<hr size=?>
Sets size (height) of horizontal rule
<hr width=?>
Sets width of rule (as a % or absolute pixel length)
<hr noshade>
Creates a horizontal rule without a shadow
<img src="URL" />
Adds image; it is a separate file located at the URL
<img src="URL" align=?>
Aligns image left/right/center/bottom/top/middle (use CSS)
<img src="URL" border=?>
Sets size of border surrounding image (use CSS)
<img src="URL" height=?>
Sets height of image, in pixels
<img src="URL" width=?>
Sets width of image, in pixels
<img src="URL" alt=?>
Sets the alternate text for browsers that can't process images (required by the ADA)
<img src="URL" />	
	Adds image; it is a separate file located at the URL
<img src="URL" align=?>	
	Aligns image left/right/center/bottom/top/middle (us
<img src="URL" alt=?>	
	Sets the alternate text for browsers that can't
<img src="URL" border=?>	
 Sets the border styles
<img src="URL" height=?>	
	Sets height of image, in pixels

Forms

<form> </form>
Defines a form
<select multiple name=? size=?> </select>
Creates a scrolling menu. Size sets the number of menu items visible before user needs to scroll.
<select name=?> </select>
Creates a pulldown menu
<option>
Sets off each menu item
<textarea name=? cols="x" rows="y"></textarea>
Creates a text box area. Columns set the width; rows set the height.
<input type="checkbox" name=? value=?>
Creates a checkbox.
<input type="checkbox" name=? value=? checked>
Creates a checkbox which is pre-checked.
<input type="radio" name=? value=?>
Creates a radio button.
<input type="radio" name=? value=? checked>
Creates a radio button which is pre-checked.
<input type="text" name=? size=?>
Creates a one-line text area. Size sets length, in characters.
<input type="submit" value=?>
Creates a submit button. Value sets the text in the submit button.
<input type="image" name=? src=? border=? alt=?>
Creates a submit button using an image.
<input type="reset">
Creates a reset button
<form> </form>	
	Defines a form
<input type="checkbox" name=? value=? checked>	
	Creates a checkbox which is pre-checked.
<input type="checkbox" name=? value=?>	
	Creates a checkbox.
<input type="color" name=?>	
	 Sets a single-line text box for picking a color
<input type="date/month/week/time" name=?>	
	 Sets a single-line text box with a calendar showing the date/month/week/time
<input type="email" name=?>	
	 Sets a single-line textbox for email addresses
<input type="image" name=? src=? border=? alt=?>	
	Creates a submit button using an image.
<input type="number" name=?>	
	 Sets a single-line textbox for a number
<input type="radio" name=? value=? checked>	
	Creates a radio button which is pre-checked.
<input type="range" name=?>	
	 Sets a single-line text box for a range of numbers
<input type="reset">	
	Creates a reset button
<input type="search" name=?>	
	 Sets a single-line text box for searching
<input type="submit" value=?>
 Creates a submit button input element
<input type="text" name=? size=?>	
	Creates a one-line text area. Size sets length, in
<input type="url" name=?>	
	 Sets a single-line textbox for URLs

Tables

<table> </table>
Creates a table
<tr> </tr>
Sets off each row in a table
<td> </td>
Sets off each cell in a row
<th> </th>
Sets off the table header (a normal cell with bold, centered text)
<table border=?>
Sets the width of the border around table cells
<table cellspacing=?>
Sets amount of space between table cells
<table cellpadding=?>
Sets amount of space between a cell's border and its contents
<table width=?>
Sets width of the table in pixels or as a percentage
<tr align=?>
Sets alignment for cells within the row (left/center/right)
<td align=?>
Sets alignment for cells (left/center/right)
<tr valign=?>
Sets vertical alignment for cells within the row (top/middle/bottom)
<td valign=?>
Sets vertical alignment for cell (top/middle/bottom)
<td rowspan=?>
Sets number of rows a cell should span (default=1)
<td colspan=?>
Sets number of columns a cell should span
<td nowrap>
Prevents lines within a cell from being broken to fit
<table border=?>	
	Sets the width of the border around table cells
<table cellpadding=?>	
	Sets amount of space between a cell's border and its contents.
<table cellspacing=?>	
	Sets amount of space between table cells
<table width=?>	
	Sets width of the table in pixels or as a percentage
<table> </table>	
	Creates a table
<td align=?>	
	Sets alignment for cells (left/center/right)
<td colspan=?>	
	Sets number of columns a cell should span
<td nowrap>	
	Prevents lines within a cell from being broken to fi
<td rowspan=?>	
	Sets number of rows a cell should span (default=1)
<td valign=?>	
	Sets vertical alignment for cell (top/middle/bottom)
<td> </td>	
	Sets off each cell in a row
<th> </th>	
	Sets off the table header (a normal cell with bold, centered text)
<tr align=?>	
	Sets alignment for cells within the row (left/center/right)
<tr valign=?>	
	Sets vertical alignment for cells within the row
<tr> </tr>	
	Sets off each row in a table

HTML5

(not all browsers support; visit http://caniuse.com for details)
<input type="email" name=?>
 Sets a single-line textbox for email addresses
<input type="url" name=?>
 Sets a single-line textbox for URLs
<input type="number" name=?>
 Sets a single-line textbox for a number
<input type="range" name=?>
 Sets a single-line text box for a range of numbers
<input type="date/month/week/time" name=?>
 Sets a single-line text box with a calendar showing the date/month/week/time
<input type="search" name=?>
 Sets a single-line text box for searching
<input type="color" name=?>
 Sets a single-line text box for picking a color 
`;
	createTable(text);
