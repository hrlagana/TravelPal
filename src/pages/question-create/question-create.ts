import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { QuestionProvider } from "../../providers/question/question";

/**
 * Generated class for the EventCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-question-create',
    templateUrl: 'question-create.html',
})
export class QuestionCreatePage {

    questionDate: String = new Date().toISOString();
    constructor(public navCtrl: NavController, public questionProvider: QuestionProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventCreatePage');
    }

    createQuestion(
        questionName: string,
        questionDate: string
    ): void {
        this.questionProvider
            .createQuestion(questionName, questionDate)
            .then(newQuestion => {
                this.navCtrl.pop();
            });
    }




}
