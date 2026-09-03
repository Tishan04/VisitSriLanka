<h1 align="center">Visit Sri Lanka - Travel Guide Website</h1>

<p align="center">
Responsive tourism website built with HTML, CSS, JavaScript, PHP, and MySQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-Structure-orange">
  <img src="https://img.shields.io/badge/CSS-Styling-blue">
  <img src="https://img.shields.io/badge/JavaScript-Interactivity-yellow">
  <img src="https://img.shields.io/badge/PHP-Backend-777BB4?logo=php&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white">
</p>

<h2>Overview</h2>
<p>
Visit Sri Lanka is an academic web-development project that introduces popular destinations,
travel experiences, cultural information, and a simple trip-planning tool. The corrected
version includes responsive layouts, safer JavaScript, destination search and expandable
sections, automatic trip-duration calculation, cost estimation, and PHP/MySQL plan saving.
</p>

<h2>Technologies Used</h2>
<ul>
<li>HTML5</li>
<li>CSS3</li>
<li>JavaScript</li>
<li>PHP (PDO)</li>
<li>MySQL</li>
<li>Font Awesome</li>
<li>Google Maps embeds</li>
</ul>

<h2>Main Features</h2>
<ul>
<li>Responsive home, destinations, experiences, and trip-planning pages</li>
<li>Automatic destination-card slider on the home page</li>
<li>Culture image carousels</li>
<li>Destination search without rearranging or breaking destination sections</li>
<li>Expandable "See More" destination groups</li>
<li>Automatic active navigation highlighting</li>
<li>Destination links that preselect a place on the trip-planning form</li>
<li>Arrival/departure date validation and automatic day calculation</li>
<li>Estimated trip cost based on selected destinations, days, and travellers</li>
<li>PHP/MySQL storage of submitted travel plans</li>
<li>Server-side validation and server-side cost recalculation</li>
</ul>

<h2>Run with XAMPP</h2>
<ol>
<li>Copy the <code>VisitSriLanka-corrected</code> folder into your XAMPP <code>htdocs</code> directory.</li>
<li>Start Apache and MySQL from the XAMPP Control Panel.</li>
<li>Open phpMyAdmin and import <code>database.sql</code>.</li>
<li>If your MySQL username/password differs from the default XAMPP setup, edit <code>db.php</code>.</li>
<li>Open <code>http://localhost/VisitSriLanka-corrected/index.html</code> in your browser.</li>
</ol>

<h2>Database</h2>
<p>
The <code>travel_plans</code> table stores the traveller's contact details, dates, number of
travellers, selected destinations, notes, estimated cost, and creation time. Database writes
use PDO prepared statements. The backend recalculates the trip duration and estimated cost
instead of trusting values supplied by the browser.
</p>

<h2>Cost Calculation</h2>
<p>
Each destination has an estimated per-person, per-day cost. Because the current planner does
not ask how many days will be spent at each selected destination, the calculator assumes that
the trip days are divided evenly among the selected destinations. It therefore uses the
average daily cost of the selected destinations, multiplied by the number of trip days and
travellers.
</p>

<h2>Project Preview</h2>
<p align="center">
<img src="screenshot.png" width="100%">
</p>
