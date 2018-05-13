import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionCreatePage } from './question-create';

@NgModule({
  declarations: [
    QuestionCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionCreatePage),
  ],
})
export class QuestionCreatePageModule {}
