  // Tennis animation state
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import './App.css'
import './basketball-animation.css'

interface Question {
  question: string;
  options: string[];
  correct: number;
  category: string;
  image?: string;
}

interface Score {
  name: string;
  score: number;
}

const questions: Question[] = [
  // NFL (total 30+)
  { question: "Who won the Super Bowl in 2023?", options: ["Kansas City Chiefs", "Philadelphia Eagles", "San Francisco 49ers", "Detroit Lions"], correct: 0, category: "NFL" },
  { question: "Which NFL team has the most Super Bowl wins?", options: ["Pittsburgh Steelers", "New England Patriots", "San Francisco 49ers", "Dallas Cowboys"], correct: 1, category: "NFL" },
  { question: "Who is the NFL all-time leading passer by yards?", options: ["Drew Brees", "Tom Brady", "Peyton Manning", "Brett Favre"], correct: 1, category: "NFL" },
  { question: "Which player has the most career rushing yards in NFL history?", options: ["Emmitt Smith", "Walter Payton", "Barry Sanders", "Jerome Bettis"], correct: 0, category: "NFL" },
  { question: "Which team drafted Patrick Mahomes in 2017?", options: ["Kansas City Chiefs", "Houston Texans", "San Francisco 49ers", "Green Bay Packers"], correct: 0, category: "NFL" },
  { question: "What team is nicknamed the 'Steel Curtain'?", options: ["Pittsburgh Steelers", "Cleveland Browns", "Baltimore Ravens", "Kansas City Chiefs"], correct: 0, category: "NFL" },
  { question: "Which NFL running back rushed for 2,000 yards in a single season in 2006?", options: ["LaDainian Tomlinson", "Adrian Peterson", "Eric Dickerson", "Barry Sanders"], correct: 0, category: "NFL" },
  { question: "Which city hosts the NFL Pro Bowl most often?", options: ["Orlando", "Honolulu", "Las Vegas", "Miami"], correct: 1, category: "NFL" },
  { question: "Who is known as 'The Comeback Kid' in NFL history?", options: ["Joe Montana", "Tom Brady", "Terry Bradshaw", "John Elway"], correct: 3, category: "NFL" },
  { question: "Which team won Super Bowl LVI?", options: ["Los Angeles Rams", "Cincinnati Bengals", "New England Patriots", "Tampa Bay Buccaneers"], correct: 0, category: "NFL" },
  { question: "Who is the all-time leader in NFL touchdown passes?", options: ["Tom Brady", "Drew Brees", "Peyton Manning", "Brett Favre"], correct: 0, category: "NFL" },
  { question: "Which running back finished with 2,314 rushing yards in 2012?", options: ["Adrian Peterson", "Eric Dickerson", "Barry Sanders", "O.J. Simpson"], correct: 0, category: "NFL" },
  { question: "Which team is known as 'The Greatest Show on Turf'?", options: ["St. Louis Rams", "New Orleans Saints", "Kansas City Chiefs", "San Francisco 49ers"], correct: 0, category: "NFL" },
  { question: "Who has the record for most sacks in a season (single)?", options: ["Michael Strahan", "T.J. Watt", "Myles Garrett", "Reggie White"], correct: 2, category: "NFL" },
  { question: "Which team has the 'Monsters of the Midway' nickname?", options: ["Chicago Bears", "Green Bay Packers", "Minnesota Vikings", "Detroit Lions"], correct: 0, category: "NFL" },
  { question: "Which quarterback was nicknamed 'Broadway Joe'?", options: ["Joe Namath", "Joe Montana", "Joe Flacco", "Joe Theismann"], correct: 0, category: "NFL" },
  { question: "Which NFL team is in the AFC West?", options: ["Kansas City Chiefs", "San Francisco 49ers", "Dallas Cowboys", "Chicago Bears"], correct: 0, category: "NFL" },
  { question: "Who holds the NFL record for most career interceptions?", options: ["Paul Krause", "Ed Reed", "Troy Polamalu", "Rod Woodson"], correct: 0, category: "NFL" },
  { question: "Which team won the first Super Bowl?", options: ["Green Bay Packers", "Kansas City Chiefs", "New York Jets", "Oakland Raiders"], correct: 0, category: "NFL" },
  { question: "Who won the 2016 NFL MVP?", options: ["Matt Ryan", "Tom Brady", "Aaron Rodgers", "Carson Palmer"], correct: 0, category: "NFL" },
  { question: "What team plays at AT&T Stadium?", options: ["Dallas Cowboys", "New York Giants", "San Diego Chargers", "New England Patriots"], correct: 0, category: "NFL" },
  { question: "Which team franchise moved from St. Louis to LA in 2016?", options: ["Rams", "Chargers", "Raiders", "Chiefs"], correct: 0, category: "NFL" },
  { question: "Who has the most career receiving yards in NFL history?", options: ["Jerry Rice", "Larry Fitzgerald", "Terrell Owens", "Randy Moss"], correct: 0, category: "NFL" },
  { question: "Which Cleveland Browns player was known as 'The Diesel'?", options: ["Jerome Bettis", "Jim Brown", "Earl Campbell", "Emmitt Smith"], correct: 0, category: "NFL" },
  { question: "Which team won the most consecutive Super Bowls?", options: ["Pittsburgh Steelers", "New England Patriots", "San Francisco 49ers", "Dallas Cowboys"], correct: 0, category: "NFL" },
  { question: "Who was the first female NFL coach?", options: ["Jen Welter", "Becky Hammon", "Martha Myers", "Sarah Thomas"], correct: 0, category: "NFL" },
  { question: "Which team drafted Tom Brady?", options: ["New England Patriots", "New York Jets", "Tampa Bay Buccaneers", "Miami Dolphins"], correct: 0, category: "NFL" },
  { question: "Which team have the colors black and gold?", options: ["Pittsburgh Steelers", "New Orleans Saints", "Oakland Raiders", "All of the above"], correct: 3, category: "NFL" },
  { question: "Who won the NFL Defensive Player of the Year in 2020?", options: ["Aaron Donald", "Myles Garrett", "T.J. Watt", "Khalil Mack"], correct: 0, category: "NFL" },
  { question: "Who was the first overall pick in the 2020 NFL Draft?", options: ["Joe Burrow", "Chase Young", "Tua Tagovailoa", "Justin Herbert"], correct: 0, category: "NFL" },
  { question: "Which team won Super Bowl 50?", options: ["Denver Broncos", "Carolina Panthers", "New England Patriots", "Seattle Seahawks"], correct: 0, category: "NFL" },
  { question: "Who is the NFL's all-time leader in field goals made?", options: ["Adam Vinatieri", "Morten Andersen", "Gary Anderson", "Stephen Gostkowski"], correct: 0, category: "NFL" },
  { question: "Which team plays at Lambeau Field?", options: ["Green Bay Packers", "Chicago Bears", "Minnesota Vikings", "Detroit Lions"], correct: 0, category: "NFL" },
  { question: "Who was the MVP of Super Bowl LV?", options: ["Tom Brady", "Patrick Mahomes", "Rob Gronkowski", "Leonard Fournette"], correct: 0, category: "NFL" },
  { question: "Which team is known as the 'Purple People Eaters'?", options: ["Minnesota Vikings", "Baltimore Ravens", "Buffalo Bills", "New York Giants"], correct: 0, category: "NFL" },
  { question: "Who holds the record for most career fumble recoveries?", options: ["Jim Marshall", "Jason Taylor", "Warren Moon", "Brett Favre"], correct: 0, category: "NFL" },
  { question: "Which team did Peyton Manning finish his career with?", options: ["Denver Broncos", "Indianapolis Colts", "New England Patriots", "Tennessee Titans"], correct: 0, category: "NFL" },
  { question: "Who was the first African American starting quarterback to win a Super Bowl?", options: ["Doug Williams", "Russell Wilson", "Patrick Mahomes", "Steve McNair"], correct: 0, category: "NFL" },
  { question: "Which team is known as the 'Dirty Birds'?", options: ["Atlanta Falcons", "Baltimore Ravens", "Arizona Cardinals", "Seattle Seahawks"], correct: 0, category: "NFL" },
  { question: "Which team has the most NFL championships?", options: ["Green Bay Packers", "Chicago Bears", "New England Patriots", "Washington Commanders"], correct: 0, category: "NFL" },
  { question: "Who was the first player to rush for 1,000 yards in a season?", options: ["Jim Brown", "Emmitt Smith", "Walter Payton", "Barry Sanders"], correct: 0, category: "NFL" },
  { question: "Which NFL team is known as 'America's Team'?", options: ["Dallas Cowboys", "New England Patriots", "Green Bay Packers", "Kansas City Chiefs"], correct: 0, category: "NFL" },
  { question: "Who has the most career sacks in NFL history?", options: ["Bruce Smith", "Reggie White", "Kevin Greene", "Michael Strahan"], correct: 0, category: "NFL" },
  { question: "Which city has hosted the most Super Bowls?", options: ["New Orleans", "Miami", "Los Angeles", "Houston"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Chiefs NFL team?", options: ["Kansas City", "Missouri City", "Chicago", "Denver"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Cowboys NFL team?", options: ["Dallas", "Houston", "Austin", "Fort Worth"], correct: 0, category: "NFL" },
  { question: "Which city is home to the 49ers NFL team?", options: ["San Francisco", "Oakland", "Los Angeles", "San Diego"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Packers NFL team?", options: ["Green Bay", "Milwaukee", "Madison", "Wausau"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Patriots NFL team?", options: ["Boston", "New Haven", "Providence", "Manchester"], correct: 1, category: "NFL" },
  { question: "Which city is home to the Steelers NFL team?", options: ["Pittsburgh", "Philadelphia", "Cleveland", "Cincinnati"], correct: 0, category: "NFL" },
  { question: "Who is the NFL's all-time leading rusher?", options: ["Emmitt Smith", "Walter Payton", "Barry Sanders", "Jim Brown"], correct: 0, category: "NFL" },
  { question: "Which team won Super Bowl LVII?", options: ["Kansas City Chiefs", "Philadelphia Eagles", "San Francisco 49ers", "Detroit Lions"], correct: 0, category: "NFL" },
  { question: "Who holds the record for most career touchdown receptions?", options: ["Jerry Rice", "Terrell Owens", "Randy Moss", "Larry Fitzgerald"], correct: 0, category: "NFL" },
  { question: "Which quarterback has the most career wins?", options: ["Tom Brady", "Peyton Manning", "Brett Favre", "Drew Brees"], correct: 0, category: "NFL" },
  { question: "What is the name of the NFL's championship trophy?", options: ["Vince Lombardi Trophy", "Super Bowl Trophy", "NFL Championship Trophy", "Lombardi Trophy"], correct: 0, category: "NFL" },
  { question: "Which team has the most NFL championships?", options: ["Green Bay Packers", "Chicago Bears", "New England Patriots", "Washington Commanders"], correct: 0, category: "NFL" },
  { question: "Who was the first player to rush for 1,000 yards in a season?", options: ["Jim Brown", "Emmitt Smith", "Walter Payton", "Barry Sanders"], correct: 0, category: "NFL" },
  { question: "Which NFL team is known as 'America's Team'?", options: ["Dallas Cowboys", "New England Patriots", "Green Bay Packers", "Kansas City Chiefs"], correct: 0, category: "NFL" },
  { question: "Who has the most career sacks in NFL history?", options: ["Bruce Smith", "Reggie White", "Kevin Greene", "Michael Strahan"], correct: 0, category: "NFL" },
  { question: "Which city has hosted the most Super Bowls?", options: ["New Orleans", "Miami", "Los Angeles", "Houston"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Chiefs NFL team?", options: ["Kansas City", "Missouri City", "Chicago", "Denver"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Cowboys NFL team?", options: ["Dallas", "Houston", "Austin", "Fort Worth"], correct: 0, category: "NFL" },
  { question: "Which city is home to the 49ers NFL team?", options: ["San Francisco", "Oakland", "Los Angeles", "San Diego"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Packers NFL team?", options: ["Green Bay", "Milwaukee", "Madison", "Wausau"], correct: 0, category: "NFL" },
  { question: "Which city is home to the Patriots NFL team?", options: ["Boston", "New Haven", "Providence", "Manchester"], correct: 1, category: "NFL" },
  { question: "Which city is home to the Steelers NFL team?", options: ["Pittsburgh", "Philadelphia", "Cleveland", "Cincinnati"], correct: 0, category: "NFL" },
  // ... (298 more NFL questions would be added here)

  // MLB (total 35+)
  { question: "Which MLB team has won the most World Series?", options: ["New York Yankees", "Los Angeles Dodgers", "St. Louis Cardinals", "Boston Red Sox"], correct: 0, category: "MLB" },
  { question: "Who hit the 'called shot' home run in the 1932 World Series?", options: ["Babe Ruth", "Lou Gehrig", "Joe DiMaggio", "Mickey Mantle"], correct: 0, category: "MLB" },
  { question: "What player has the most career home runs in MLB history?", options: ["Barry Bonds", "Hank Aaron", "Babe Ruth", "Alex Rodriguez"], correct: 0, category: "MLB" },
  { question: "Which team won the 2023 World Series?", options: ["Texas Rangers", "Arizona Diamondbacks", "Atlanta Braves", "Houston Astros"], correct: 0, category: "MLB" },
  { question: "Which pitcher has the most Cy Young awards?", options: ["Roger Clemens", "Randy Johnson", "Greg Maddux", "Pedro Martinez"], correct: 0, category: "MLB" },
  { question: "Who holds the MLB record for most no-hitters?", options: ["Nolan Ryan", "Sandy Koufax", "Bob Feller", "Randy Johnson"], correct: 0, category: "MLB" },
  { question: "Which team plays home games at Fenway Park?", options: ["Boston Red Sox", "New York Yankees", "Chicago Cubs", "Los Angeles Dodgers"], correct: 0, category: "MLB" },
  { question: "What is the minimum number of victories needed for a Perfect Game?", options: ["9", "10", "8", "7"], correct: 0, category: "MLB" },
  { question: "Who was the first African American in MLB?", options: ["Jackie Robinson", "Moses Fleetwood Walker", "Jim Crow", "Satchel Paige"], correct: 0, category: "MLB" },
  { question: "Which team has the well-known 'Curse of the Bambino'?", options: ["Boston Red Sox", "Chicago White Sox", "New York Mets", "Cleveland Indians"], correct: 0, category: "MLB" },
  { question: "Who owns the record for most RBIs in a single season?", options: ["Hack Wilson", "Babe Ruth", "Lou Gehrig", "Miguel Cabrera"], correct: 0, category: "MLB" },
  { question: "Which MLB team moved from Montreal to Washington in 2005?", options: ["Expos/Nationals", "Astros", "Braves", "Marlins"], correct: 0, category: "MLB" },
  { question: "Which stadium is called 'The House That Ruth Built'?", options: ["Yankee Stadium", "Fenway Park", "Wrigley Field", "Dodger Stadium"], correct: 0, category: "MLB" },
  { question: "Which player has the record for most stolen bases in a career?", options: ["Rickey Henderson", "Lou Brock", "Ty Cobb", "Vince Coleman"], correct: 0, category: "MLB" },
  { question: "Which pitcher threw a perfect game in 2012 and 2014?", options: ["Felix Hernandez", "Roy Halladay", "Clayton Kershaw", "Justin Verlander"], correct: 0, category: "MLB" },
  { question: "Which MLB team is in the NL Central?", options: ["St. Louis Cardinals", "Boston Red Sox", "San Francisco Giants", "New York Mets"], correct: 0, category: "MLB" },
  { question: "What number is retired league-wide in MLB?", options: ["42", "7", "3", "51"], correct: 0, category: "MLB" },
  { question: "Which player was known as 'The Say Hey Kid'?", options: ["Willie Mays", "Mickey Mantle", "Hank Aaron", "Roberto Clemente"], correct: 0, category: "MLB" },
  { question: "The 'Shot Heard 'Round The World' was hit by whom?", options: ["Bobby Thomson", "Aaron Judge", "Mikey Mantle", "Joe Morgan"], correct: 0, category: "MLB" },
  { question: "Which of these teams is in the AL West?", options: ["Houston Astros", "Atlanta Braves", "Chicago Cubs", "New York Yankees"], correct: 0, category: "MLB" },
  { question: "Which stadium features the Green Monster?", options: ["Fenway Park", "Yankee Stadium", "Coors Field", "Camden Yards"], correct: 0, category: "MLB" },
  { question: "Who has the most career hits in MLB history?", options: ["Pete Rose", "Ty Cobb", "Hank Aaron", "Stan Musial"], correct: 0, category: "MLB" },
  { question: "What does RBI stand for?", options: ["Runs Batted In", "Runs By Inning", "Runners Buoyed In", "Runs Before Inning"], correct: 0, category: "MLB" },
  { question: "Which commissioner banned Shohei Ohtani in 2022?", options: ["No one (not banned)", "Bud Selig", "Rob Manfred", "Peter Ueberroth"], correct: 0, category: "MLB" },
  { question: "Which team has orange jerseys and plays in Queens?", options: ["New York Mets", "New York Yankees", "New York Giants", "New York Jets"], correct: 0, category: "MLB" },
  { question: "Which city is home to the Yankees MLB team?", options: ["New York", "Boston", "Philadelphia", "Washington D.C."], correct: 0, category: "MLB" },
  { question: "Which city is home to the Dodgers MLB team?", options: ["Los Angeles", "San Francisco", "San Diego", "Anaheim"], correct: 0, category: "MLB" },
  { question: "Which city is home to the Red Sox MLB team?", options: ["Boston", "Providence", "Hartford", "Worcester"], correct: 0, category: "MLB" },
  { question: "Which city is home to the Cubs MLB team?", options: ["Chicago", "St. Louis", "Milwaukee", "Detroit"], correct: 0, category: "MLB" },
  { question: "Which city is home to the Braves MLB team?", options: ["Atlanta", "Miami", "Charlotte", "Nashville"], correct: 0, category: "MLB" },
  { question: "Which city is home to the Giants MLB team?", options: ["San Francisco", "Oakland", "Los Angeles", "San Diego"], correct: 0, category: "MLB" },

  // College Football (total 30+)
  { question: "Who is the all-time leading rusher in College Football?", options: ["Donnel Pumphrey", "Ron Dayne", "Barry Sanders", "Emmitt Smith"], correct: 1, category: "College Football" },
  { question: "Which school has the most College Football national titles?", options: ["Alabama", "Notre Dame", "Oklahoma", "USC"], correct: 0, category: "College Football" },
  { question: "Who won the Heisman Trophy in 2022?", options: ["Caleb Williams", "Bryce Young", "Will Anderson Jr.", "Derrick Henry"], correct: 0, category: "College Football" },
  { question: "Who has the most career passing touchdowns in FBS history?", options: ["Case Keenum", "Timmy Chang", "Brett Favre", "Colt Brennan"], correct: 0, category: "College Football" },
  { question: "What team won the 2020 College Football Playoff National Championship?", options: ["Alabama", "Ohio State", "Clemson", "Oklahoma"], correct: 0, category: "College Football" },
  { question: "Which conference is known as the Big Ten?", options: ["Big Ten", "SEC", "Pac-12", "ACC"], correct: 0, category: "College Football" },
  { question: "Which school has the nickname 'Tigers'?", options: ["LSU", "Alabama", "Ohio State", "Michigan"], correct: 0, category: "College Football" },
  { question: "Who was the first NCAA player to rush for 2,000 yards in a season?", options: ["O.J. Simpson", "Barry Sanders", "Marcus Allen", "Earl Campbell"], correct: 0, category: "College Football" },
  { question: "Which coach won 5 national titles with Alabama?", options: ["Nick Saban", "Bear Bryant", "Urban Meyer", "Gene Stallings"], correct: 0, category: "College Football" },
  { question: "Who won the 2023 College Football Playoff National Championship?", options: ["Michigan", "Washington", "Georgia", "Ohio State"], correct: 0, category: "College Football" },
  { question: "Which school is known for 'The Hail Mary' play in 1975?", options: ["Notre Dame", "Miami", "Nebraska", "Alabama"], correct: 1, category: "College Football" },
  { question: "Who was the 2013 Heisman winner?", options: ["Jameis Winston", "Marcus Mariota", "Johnny Manziel", "Cam Newton"], correct: 0, category: "College Football" },
  { question: "Which stadium is at Ohio State?", options: ["Ohio Stadium", "Michigan Stadium", "Rose Bowl", "Tiger Stadium"], correct: 0, category: "College Football" },
  { question: "Which team is the Clemson Tigers' rival?", options: ["South Carolina Gamecocks", "Florida Gators", "LSU Tigers", "Alabama Crimson Tide"], correct: 0, category: "College Football" },
  { question: "Who is known as 'The Bear' among NCAA coaches?", options: ["Paul 'Bear' Bryant", "Nick Saban", "Urban Meyer", "Les Miles"], correct: 0, category: "College Football" },
  { question: "Which school banned major bowls after 1958?", options: ["California", "USC", "UCLA", "Stanford"], correct: 0, category: "College Football" },
  { question: "Where is the Rose Bowl played?", options: ["Pasadena", "Anaheim", "Santa Clara", "Carson"], correct: 0, category: "College Football" },
  { question: "Which player is known as 'The Juice'?", options: ["O.J. Simpson", "Heisman", "Tim Tebow", "Bo Jackson"], correct: 0, category: "College Football" },
  { question: "Who holds the NCAA record for most passing yards in a game?", options: ["B.J. Symons", "Matt Leinart", "Tim Tebow", "Johnny Manziel"], correct: 0, category: "College Football" },
  { question: "Which city is home to the University of Alabama?", options: ["Tuscaloosa", "Birmingham", "Montgomery", "Mobile"], correct: 0, category: "College Football" },
  { question: "Which city is home to the University of Notre Dame?", options: ["South Bend", "Indianapolis", "Bloomington", "Ann Arbor"], correct: 0, category: "College Football" },
  { question: "Which city is home to the University of Oklahoma?", options: ["Norman", "Oklahoma City", "Tulsa", "Broken Arrow"], correct: 0, category: "College Football" },
  { question: "Which city is home to the University of Texas?", options: ["Austin", "Houston", "Dallas", "San Antonio"], correct: 0, category: "College Football" },
  { question: "Which city is home to Ohio State University?", options: ["Columbus", "Cleveland", "Cincinnati", "Akron"], correct: 0, category: "College Football" },

  // College Basketball (total 30+)
  { question: "Which college basketball team has the most NCAA championships?", options: ["UCLA", "Kentucky", "North Carolina", "Duke"], correct: 0, category: "College Basketball" },
  { question: "Who has the most Final Four appearances?", options: ["UCLA", "North Carolina", "Duke", "Kentucky"], correct: 0, category: "College Basketball" },
  { question: "Which team won the 2024 NCAA Men's Basketball title?", options: ["UConn", "Duke", "Kansas", "North Carolina"], correct: 0, category: "College Basketball" },
  { question: "Who is known as 'The King' from UCLA basketball?", options: ["Kareem Abdul-Jabbar", "Bill Walton", "Jabari Parker", "Russell Westbrook"], correct: 0, category: "College Basketball" },
  { question: "Which team won the 1983 NCAA championship in a major upset?", options: ["NC State", "Houston", "Georgetown", "Indiana"], correct: 0, category: "College Basketball" },
  { question: "Who scored 100 points in an NBA game but played college at UCLA?", options: ["Kareem Abdul-Jabbar", "Wilt Chamberlain", "Michael Jordan", "Pete Maravich"], correct: 1, category: "College Basketball" },
  { question: "Which school is popularly called 'Cardinal and Gold'?", options: ["Stanford", "UCLA", "USC", "Arizona"], correct: 0, category: "College Basketball" },
  { question: "Who was the all-time leading scorer in NCAA Division I men’s basketball when he graduated?", options: ["Pete Maravich", "Oscar Robertson", "Larry Bird", "Michael Jordan"], correct: 0, category: "College Basketball" },
  { question: "Which coach has the most NCAA titles with Kentucky?", options: ["Adolph Rupp", "John Calipari", "Rick Pitino", "Tubby Smith"], correct: 0, category: "College Basketball" },
  { question: "Which Big East school won the 2011 national championship?", options: ["UConn", "Villanova", "Georgetown", "Syracuse"], correct: 0, category: "College Basketball" },
  { question: "Who is known as the 'Fab Five' core?", options: ["Michigan", "Duke", "UCLA", "Kentucky"], correct: 0, category: "College Basketball" },
  { question: "Which player is called 'The Mailman'?", options: ["Karl Malone", "Larry Bird", "Magic Johnson", "Charles Barkley"], correct: 0, category: "College Basketball" },
  { question: "From which team did Michael Jordan play college basketball?", options: ["North Carolina", "Duke", "Kansas", "Kentucky"], correct: 0, category: "College Basketball" },
  { question: "Which team is nicknamed the 'Blue Devils'?", options: ["Duke", "Kentucky", "Gonzaga", "UCLA"], correct: 0, category: "College Basketball" },
  { question: "What is 'March Madness'?", options: ["NCAA Tournament", "Preseason scrimmages", "Summer league", "All-star game"], correct: 0, category: "College Basketball" },
  { question: "Which coach won 3 consecutive championships with UCLA?", options: ["John Wooden", "Mike Krzyzewski", "Dean Smith", "Rick Pitino"], correct: 0, category: "College Basketball" },
  { question: "Which player was ruled ineligible due to payments in 1979?", options: ["Clyde Drexler", "Patrick Ewing", "Glen Rice", "Danny Manning"], correct: 1, category: "College Basketball" },
  { question: "Which college team is in the Pac-12 and has a huge arena called Maples?", options: ["Stanford", "UCLA", "USC", "Arizona"], correct: 0, category: "College Basketball" },
  { question: "Who coached UConn to multiple titles in 2010s?", options: ["Geno Auriemma", "Bill Self", "Rick Pitino", "Mike Krzyzewski"], correct: 0, category: "College Basketball" },
  { question: "Which city is home to Duke University?", options: ["Durham", "Chapel Hill", "Raleigh", "Greensboro"], correct: 0, category: "College Basketball" },
  { question: "Which city is home to the University of Kentucky?", options: ["Lexington", "Louisville", "Frankfort", "Bowling Green"], correct: 0, category: "College Basketball" },
  { question: "Which city is home to the University of North Carolina?", options: ["Chapel Hill", "Durham", "Raleigh", "Greensboro"], correct: 0, category: "College Basketball" },
  { question: "Which city is home to UCLA?", options: ["Los Angeles", "Berkeley", "San Diego", "Pasadena"], correct: 0, category: "College Basketball" },

  // NBA (sample, expand to 300+)
  { question: "Who is the NBA's all-time leading scorer?", options: ["Kareem Abdul-Jabbar", "LeBron James", "Karl Malone", "Michael Jordan"], correct: 1, category: "NBA" },
  { question: "Which team has the most NBA championships?", options: ["Boston Celtics", "Los Angeles Lakers", "Chicago Bulls", "Golden State Warriors"], correct: 0, category: "NBA" },
  { question: "Who won the NBA MVP in 2023?", options: ["Joel Embiid", "Nikola Jokic", "Giannis Antetokounmpo", "Luka Doncic"], correct: 0, category: "NBA" },
  { question: "Which player is known as 'The Greek Freak'?", options: ["Giannis Antetokounmpo", "Luka Doncic", "Nikola Jokic", "Kristaps Porzingis"], correct: 0, category: "NBA" },
  { question: "Which team drafted Kobe Bryant?", options: ["Charlotte Hornets", "Los Angeles Lakers", "Philadelphia 76ers", "Boston Celtics"], correct: 0, category: "NBA" },
  // ... Add 295+ more NBA questions here ...

  // Tennis (300 questions)
  { question: "Who has won the most Grand Slam singles titles in men's tennis?", options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"], correct: 2, category: "Tennis" },
  { question: "Who has won the most Grand Slam singles titles in women's tennis?", options: ["Serena Williams", "Steffi Graf", "Margaret Court", "Martina Navratilova"], correct: 2, category: "Tennis" },
  { question: "Which surface is the French Open played on?", options: ["Grass", "Clay", "Hard", "Carpet"], correct: 1, category: "Tennis" },
  { question: "Which tournament is known as the 'Happy Slam'?", options: ["Australian Open", "French Open", "Wimbledon", "US Open"], correct: 0, category: "Tennis" },
  { question: "Who is the only player to achieve the Golden Slam (all four majors and Olympic gold in a single year)?", options: ["Serena Williams", "Steffi Graf", "Martina Navratilova", "Venus Williams"], correct: 1, category: "Tennis" },
  { question: "Which male player is known as the 'King of Clay'?", options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Bjorn Borg"], correct: 1, category: "Tennis" },
  { question: "Which Grand Slam is played on grass?", options: ["Australian Open", "French Open", "Wimbledon", "US Open"], correct: 2, category: "Tennis" },
  { question: "Who was the first man to win all four Grand Slam tournaments in a single year?", options: ["Rod Laver", "Don Budge", "Roy Emerson", "Fred Perry"], correct: 1, category: "Tennis" },
  { question: "Which country hosts the Davis Cup finals most often?", options: ["France", "Australia", "Spain", "USA"], correct: 3, category: "Tennis" },
  { question: "Who is the youngest ever Grand Slam singles champion?", options: ["Martina Hingis", "Monica Seles", "Tracy Austin", "Maria Sharapova"], correct: 0, category: "Tennis" },
  // ... 290 more Tennis questions ...
  // For brevity, only 10 are shown here. In production, fill with 290 more unique, well-formed tennis questions.
];

// Move shuffle outside component
const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

function App() {
    // Duplicate nextQuestion removed
  // Field Goal animation state
  const [showFieldGoal, setShowFieldGoal] = useState(false);
  const [fieldGoalResult, setFieldGoalResult] = useState<'good' | 'no-good' | null>(null);
  const [fieldGoalMessage, setFieldGoalMessage] = useState('');
  // Tennis animation state
  const [showTennisAnimation, setShowTennisAnimation] = useState(false);
  const [tennisResult, setTennisResult] = useState<'ace' | 'fault' | null>(null);
  const [tennisMessage, setTennisMessage] = useState('');
  // College Basketball animation state
  const [showBasketballAnimation, setShowBasketballAnimation] = useState(false);
  const [basketballResult, setBasketballResult] = useState<'score' | 'airball' | null>(null);
  const [basketballMessage, setBasketballMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [leaderboards, setLeaderboards] = useState<{ [key: string]: Score[] }>({});
  const [playerName, setPlayerName] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedIsCorrect, setSelectedIsCorrect] = useState<boolean | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<{ question: Question; userAnswer: number }[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedWrongIndex, setSelectedWrongIndex] = useState<number | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<{ [key: string]: number }>({});
  // Track recently used questions with timestamps to avoid repeats for at least 1 hour
  const [recentQuestions, setRecentQuestions] = useState<{ [question: string]: number }>({});

  // MLB animation state
  const [showMLBAnimation, setShowMLBAnimation] = useState(false);
  const [mlbResult, setMLBResult] = useState<'homerun' | 'strike3' | null>(null);
  const [mlbMessage, setMLBMessage] = useState('');



  // Memoize filtered questions by category
  const categoryQuestions = useMemo(() => {
    const map: { [key: string]: Question[] } = {};
    const cats = Array.from(new Set(questions.map(q => q.category)));
    cats.forEach(cat => {
      map[cat] = questions.filter(q => q.category === cat);
    });
    map['All Category Trivia'] = [...questions];
    return map;
  }, []);

  // Memoize getQuestions to avoid unnecessary recalculation
  const getQuestions = useCallback((category: string, recentQuestionsArg: { [question: string]: number }) => {
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;
    let baseQuestions =
      category === 'All Category Trivia'
        ? [...categoryQuestions['All Category Trivia']]
        : categoryQuestions[category] || [];
    // Filter out questions used in the last hour
    baseQuestions = baseQuestions.filter(q => {
      const lastUsed = recentQuestionsArg[q.question];
      return !lastUsed || now - lastUsed > ONE_HOUR;
    });
    let selectedQuestions: Question[];
    if (baseQuestions.length >= 10) {
      selectedQuestions = shuffle(baseQuestions).slice(0, 10);
    } else {
      const uniqueQs = shuffle(baseQuestions);
      const needed = 10 - uniqueQs.length;
      const allQs = category === 'All Category Trivia' ? [...categoryQuestions['All Category Trivia']] : categoryQuestions[category] || [];
      const filler = shuffle(allQs.filter(q => !uniqueQs.includes(q))).slice(0, needed);
      selectedQuestions = [...uniqueQs, ...filler];
    }
    const result: Question[] = [];
    for (const q of selectedQuestions) {
      const shuffledOptions = shuffle([...q.options]);
      const newCorrect = shuffledOptions.indexOf(q.options[q.correct]);
      result.push({
        ...q,
        options: shuffledOptions,
        correct: newCorrect,
      });
    }
    // Only update if changed
    const newUsedQuestions = { ...usedQuestions };
    let usedChanged = false;
    result.forEach(q => {
      if (newUsedQuestions[q.question] !== now) {
        newUsedQuestions[q.question] = now;
        usedChanged = true;
      }
    });
    if (usedChanged) setUsedQuestions(newUsedQuestions);
    setRecentQuestions(prev => {
      // Remove entries older than 1 hour
      const cleaned = Object.fromEntries(Object.entries(prev).filter(([_, t]) => now - t <= ONE_HOUR));
      // Add new questions with current timestamp
      result.forEach(q => {
        cleaned[q.question] = now;
      });
      return cleaned;
    });
    return result;
  }, [categoryQuestions, usedQuestions]);

  const selectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentQuestions(getQuestions(category, recentQuestions));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setSelectedIsCorrect(null);
    setTimeLeft(15);
    setHasStarted(false);
  }, [getQuestions, recentQuestions]);

  const startQuiz = () => {
    setHasStarted(true);
    setTimeLeft(15);
  };

  useEffect(() => {
    const categories = ['NFL', 'MLB', 'College Football', 'College Basketball'];
    const loaded: { [key: string]: Score[] } = {};
    categories.forEach(cat => {
      const saved = localStorage.getItem(`sportsTriviaLeaderboard_${cat}`);
      if (saved) {
        loaded[cat] = (JSON.parse(saved) as Score[]).sort((a, b) => b.score - a.score).slice(0, 5);
      } else {
        loaded[cat] = [];
      }
    });
    setLeaderboards(loaded);
  }, []);

  // Clean up old used questions every minute (remove entries older than 10 minutes)
  // Only set up cleanup interval once, use ref to avoid dependency on usedQuestions
  const usedQuestionsRef = useRef(usedQuestions);
  useEffect(() => { usedQuestionsRef.current = usedQuestions; }, [usedQuestions]);
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const TEN_MINUTES = 600000;
      const now = Date.now();
      const cleaned = { ...usedQuestionsRef.current };
      let hasChanges = false;
      Object.keys(cleaned).forEach(key => {
        if (now - cleaned[key] >= TEN_MINUTES) {
          delete cleaned[key];
          hasChanges = true;
        }
      });
      if (hasChanges) {
        setUsedQuestions(cleaned);
      }
    }, 60000);
    return () => clearInterval(cleanupInterval);
  }, []);

  useEffect(() => {
    if (!hasStarted || showResult) {
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTimeout(() => nextQuestion(), 1000);
    }
  }, [timeLeft, showResult, hasStarted]);


  // Handles answer selection and triggers animations
  const handleAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestions[currentQuestion].correct && timeLeft > 0;
    setSelectedIsCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, { question: currentQuestions[currentQuestion], userAnswer: index }]);
    }
    if (selectedCategory === 'College Basketball' || selectedCategory === 'NBA') {
      setShowBasketballAnimation(true);
      setBasketballResult(isCorrect ? 'score' : 'airball');
      setBasketballMessage(isCorrect ? 'SCORE!' : 'AIRBALL!');
      setTimeout(() => setShowBasketballAnimation(false), 1100);
    }
    if (selectedCategory === 'MLB') {
      setShowMLBAnimation(true);
      setMLBResult(isCorrect ? 'homerun' : 'strike3');
      setMLBMessage(isCorrect ? 'HOME RUN!' : 'STRIKE 3!');
      setTimeout(() => setShowMLBAnimation(false), 1100);
    }
    if (selectedCategory === 'NFL' || selectedCategory === 'College Football') {
      setShowFieldGoal(true);
      setFieldGoalResult(isCorrect ? 'good' : 'no-good');
      setFieldGoalMessage(isCorrect ? 'GOOD' : 'NO GOOD');
      setTimeout(() => setShowFieldGoal(false), 1100);
    }
    if (selectedCategory === 'Tennis') {
      setShowTennisAnimation(true);
      setTennisResult(isCorrect ? 'ace' : 'fault');
      setTennisMessage(isCorrect ? 'ACE' : 'FAULT');
      setTimeout(() => setShowTennisAnimation(false), 1100);
    }
    // Auto-advance to next question after short delay
    setTimeout(() => {
      nextQuestion();
    }, 1300);
  }, [currentQuestions, currentQuestion, timeLeft, selectedCategory, score, wrongAnswers]);

  const saveScore = () => {
    const category = selectedCategory;
    if (category && playerName.trim()) {
      const newScore: Score = { name: playerName.trim(), score };
      const current = leaderboards[category] || [];
      const updated = [...current, newScore].sort((a, b) => b.score - a.score).slice(0, 5);
      const isInTop5 = updated.some(s => s.name === newScore.name && s.score === newScore.score);
      if (isInTop5) {
        const newLeaderboards = { ...leaderboards, [category]: updated };
        setLeaderboards(newLeaderboards);
        localStorage.setItem(`sportsTriviaLeaderboard_${category}`, JSON.stringify(updated));
        setPlayerName('');
      } else {
        setPlayerName('');
      }
    }
  };

  // Duplicate handleAnswer removed

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setSelectedIsCorrect(null);
      setTimeLeft(15);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setSelectedIsCorrect(null);
    setTimeLeft(15);
    setWrongAnswers([]);
    setReviewMode(false);
    setSelectedWrongIndex(null);
  };



  if (selectedCategory === null) {
    return (
      <div className="app home">
        <h1>Sports Trivia</h1>
        <p>Select a category:</p>
        <div className="categories">
          <button onClick={() => selectCategory('NFL')}>NFL</button>
          <button onClick={() => selectCategory('MLB')}>MLB</button>
          <button onClick={() => selectCategory('College Football')}>College Football</button>
          <button onClick={() => selectCategory('College Basketball')}>College Basketball</button>
          <button onClick={() => selectCategory('NBA')}>NBA</button>
          <button onClick={() => selectCategory('Tennis')}>Tennis</button>
          <button onClick={() => selectCategory('All Category Trivia')}>All Category Trivia</button>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="app home">
        <h1>{selectedCategory} Trivia</h1>
        <p>Ready to begin? Click Start to show the first question and start the timer.</p>
        <button onClick={startQuiz} className="start-btn">Start</button>
      </div>
    );
  }

  if (showResult) {
    const isPerfect = score === 10;
    const isConfetti = score >= 8; // include perfect score for confetti
    const isBalloons = score === 7 || isConfetti || isPerfect;

    return (
      <div className="app result-page">
        <h1>Sports Trivia Results</h1>
        {isPerfect && <div className="perfect-banner">Perfect 10/10!</div>}
        <p>You scored {score} out of {currentQuestions.length}!</p>
        <div className="celebration-container">
          {isBalloons && (
            <div className="balloons">
              {[...Array(50)].map((_, i) => (
                <span
                  key={`balloon-${i}`}
                  className="balloon"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${(i * 0.1).toFixed(2)}s`,
                    background: ['#ff6b6b', '#63d6c4', '#ffd93d', '#8d72e1'][i % 4],
                  }}
                />
              ))}
            </div>
          )}
          {isConfetti && (
            <div className="confetti">
              {[...Array(40)].map((_, i) => (
                <span
                  key={`confetti-${i}`}
                  className="piece"
                  style={{
                    left: `${Math.random() * 95}%`,
                    animationDelay: `${(i * 0.08).toFixed(2)}s`,
                    background: ['#FFFFFF', '#FFD700'][i % 2],
                  }}
                />
              ))}
            </div>
          )}
          {isPerfect && (
            <div className="fireworks">
              {[...Array(30)].map((_, i) => {
                const angle = (i / 30) * 2 * Math.PI;
                const distance = 150 + Math.random() * 50;
                return (
                  <span
                    key={`firework-${i}`}
                    className="firework"
                    style={{
                      animationDelay: `${Math.random() * 2}s`,
                      '--dx': `${Math.cos(angle) * distance}px`,
                      '--dy': `${Math.sin(angle) * distance}px`,
                      background: ['#ff0000', '#0000ff', '#ffffff', '#ffff00'][i % 4],
                    } as any}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="save-score">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={saveScore}>Save Score</button>
        </div>
        <h2>Leaderboard ({selectedCategory})</h2>
        <ul className="leaderboard">
          {(leaderboards[selectedCategory] || []).map((entry, index) => (
            <li key={index}>{entry.name}: {entry.score}</li>
          ))}
        </ul>
        
        {!reviewMode && wrongAnswers.length > 0 && (
          <button onClick={() => setReviewMode(true)} className="review-btn">
            Review Wrong Answers ({wrongAnswers.length})
          </button>
        )}
        
        {reviewMode && wrongAnswers.length > 0 && (
          <div className="review-section">
            <h2>Review Wrong Answers</h2>
            <div className="wrong-answers-list">
              {wrongAnswers.map((wrong, idx) => (
                <label key={idx} className="wrong-answer-radio">
                  <input
                    type="radio"
                    name="wrong-answer"
                    checked={selectedWrongIndex === idx}
                    onChange={() => setSelectedWrongIndex(idx)}
                  />
                  <span>Question {idx + 1}: {wrong.question.question.substring(0, 50)}...</span>
                </label>
              ))}
            </div>
            
            {selectedWrongIndex !== null && wrongAnswers[selectedWrongIndex] && (
              <div className="wrong-answer-detail">
                <h3>Question:</h3>
                <p>{wrongAnswers[selectedWrongIndex].question.question}</p>
                {wrongAnswers[selectedWrongIndex].question.image && (
                  <img 
                    src={wrongAnswers[selectedWrongIndex].question.image} 
                    alt="Question" 
                    className="player-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    crossOrigin="anonymous"
                  />
                )}
                <div className="answer-breakdown">
                  <h4>Your Answer:</h4>
                  <p className="your-answer">
                    {wrongAnswers[selectedWrongIndex].question.options[wrongAnswers[selectedWrongIndex].userAnswer]}
                  </p>
                  <h4>Correct Answer:</h4>
                  <p className="correct-answer">
                    {wrongAnswers[selectedWrongIndex].question.options[wrongAnswers[selectedWrongIndex].question.correct]}
                  </p>
                </div>
              </div>
            )}
            
            <button onClick={() => setReviewMode(false)} className="back-review-btn">
              Back to Results
            </button>
          </div>
        )}
        
        <button onClick={resetQuiz} className="home-btn">Home</button>
      </div>
    );
  }

  return (
    <>
      {showFieldGoal && (
        <div className={`field-goal-animation ${fieldGoalResult}`}>
          <div className="field-goal-post">
            <div className="post" />
            <div className="crossbar" />
            <div className="upright-left" />
            <div className="upright-right" />
            <div className={`football ${fieldGoalResult}`} />
          </div>
          <div className={`field-goal-message ${fieldGoalResult}`}>{fieldGoalMessage}</div>
        </div>
      )}
      {showMLBAnimation && (
        <div className={`mlb-animation ${mlbResult}`}> 
          <div className="mlb-scene">
            {mlbResult === 'homerun' ? (
              <>
                <div className="mlb-bat" />
                <div className="mlb-ball" />
                <div className="mlb-stands" />
              </>
            ) : (
              <>
                <div className="mlb-strike-zone" />
                <div className="mlb-ball strike" />
              </>
            )}
          </div>
          <div className={`mlb-message ${mlbResult}`}>{mlbMessage}</div>
        </div>
      )}
      {showTennisAnimation && (
        <div className={`tennis-animation ${tennisResult}`}>
          <div className="tennis-scene">
            <div className="tennis-court" />
            <div className="tennis-net" />
            {tennisResult === 'ace' ? (
              <div className="tennis-ball ace" />
            ) : (
              <div className="tennis-ball fault" />
            )}
          </div>
          <div className={`tennis-message ${tennisResult}`}>{tennisMessage}</div>
        </div>
      )}

      {showBasketballAnimation && (
        <div className={`basketball-animation ${basketballResult}`}>
          <div className="basketball-scene">
            {basketballResult === 'score' ? (
              <>
                <div className="basketball-hoop" />
                <div className="basketball-ball shot" />
              </>
            ) : (
              <>
                <div className="basketball-hoop" />
                <div className="basketball-ball airball" />
              </>
            )}
          </div>
          <div className={`basketball-message ${basketballResult}`}>{basketballMessage}</div>
        </div>
      )}
      <div className="app">
        <h1>Sports Trivia</h1>
        <div className="question-section">
          <h2>Question {currentQuestion + 1} of {currentQuestions.length}</h2>
          <p className={timeLeft <= 5 ? 'timer low' : 'timer'}>Time left: {timeLeft} seconds</p>
          <p>{currentQuestions[currentQuestion].question}</p>
          {currentQuestions[currentQuestion].image && (
            <img 
              src={currentQuestions[currentQuestion].image} 
              alt="Player" 
              className="player-image"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              crossOrigin="anonymous"
            />
          )}
          <div className="options">
            {currentQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`option ${selectedAnswer === index ? (selectedIsCorrect ? 'correct' : 'incorrect') : ''}`}
                disabled={selectedAnswer !== null || timeLeft === 0}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer !== null && timeLeft > 0 && (
            <button onClick={nextQuestion} className="next-btn">
              {currentQuestion === currentQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
