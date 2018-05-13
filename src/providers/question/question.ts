import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';


@Injectable()
export class QuestionProvider {


    public QuestionListRef: Reference;
    constructor() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.QuestionListRef = firebase
                    .database()
                    .ref(`/countries/questionList`);
            }
        });
    }

    createQuestion(
        questionName: string,
        questionDate: string
    ): ThenableReference {
        return this.QuestionListRef.push({
            name: questionName,
            date: questionDate
        });
    }

    getQuestionList(): Reference {
        return this.QuestionListRef;
    }



}