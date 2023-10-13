import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'kcc-event';

  teamName: string = '';
  teams: string[] = [];
  resultsList: any[];

  addTeam() {
    if (this.teamName.trim() !== '' || this.teamName.trim() !== null) {
      this.teams.push(this.teamName);
      this.teamName = '';
    }
  }

  generateMatches() {
    const matches = [];
    const teams = this.teams;

    let matchnumber;

    if (teams.length == 4) {
      matchnumber = 2;
    }

    // Generate all possible combinations of matches
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push([teams[i], teams[j]]);
      }
    }

    // Randomly shuffle the matches
    for (let i = matches.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [matches[i], matches[j]] = [matches[j], matches[i]];
    }

    // Each team plays exactly 2 matches
    const teamMatches = new Map();
    const result = [];

    for (const match of matches) {
      const [team1, team2] = match;

      if (!teamMatches.has(team1)) {
        teamMatches.set(team1, 0);
      }

      if (!teamMatches.has(team2)) {
        teamMatches.set(team2, 0);
      }

      if (
        teamMatches.get(team1) < matchnumber &&
        teamMatches.get(team2) < matchnumber
      ) {
        result.push(match);
        console.log('result : ', result);
        teamMatches.set(team1, teamMatches.get(team1) + 1);
        teamMatches.set(team2, teamMatches.get(team2) + 1);
      }
    }

    this.resultsList = result;
  }
}
