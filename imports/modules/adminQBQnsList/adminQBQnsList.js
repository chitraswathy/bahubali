import './adminQBQnsList.html';
import './adminQBQnsListSubscribe.js';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { questionsCollection } from '../../collections/collection.js';

// Template.deleteQuestion.onRendered(function () {
//     $("[data-toggle=tooltip]").tooltip();
// });

// Template.editQuestion.onRendered(function () {
//     $("[data-toggle=tooltip]").tooltip();
// });

Template.adminQBQnsList.onRendered(function () {

});

Template.adminQBQnsList.onCreated(function () {

});

Template.adminQBQnsList.events({
    'click #reactive-table-QBList tbody tr, #btnEdit, #btnDel'(event, instance) {

        //Edit question event
        if (event.target.id == "btnEdit") {
            FlowRouter.go('/adminQBEdit/' + this.id);
        }

        //question delete button event
        if (event.target.id == "btnDel") {
            let deleteId = this.id;
                qnsDeleteData = questionsCollection.find({ _id: deleteId }).fetch(),
                fullQuestion = qnsDeleteData[0].question,
                alertName = fullQuestion;
            $('#deleteAlert').text(alertName);
            $("#delete_modal").openModal({dismissible:false});
            $("#deletePopup").click(function () {
                Meteor.call('deleteQuestionMethod', deleteId, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        Materialize.toast("Question deleted successfully", 2000, '#4caf50 green');
                        $('#delete_modal').closeModal();
                    }
                });
            });

            $("#cancelPopup").click(function () {
                deleteId = "";
            });
        }
    },
});

Template.adminQBQnsList.helpers({
    QBListDisplay() {
        if (Template.instance().subscriptionsReady()) {
            let QBListObj = {},
                QBListArray = [],
                QBListContent = questionsCollection.find({ "deleteFlag": 0 }, { sort: { createdAt: 1 } }).fetch(),
                j = 0;

            QBListContent.forEach(function (collectionDocument, index) {
                j++;
                // console.log(collectionDocument) 
                QBListObj = {
                    id: collectionDocument._id,
                    sno: j,
                    createdAt: collectionDocument.createdAt,
                    question: collectionDocument.question
                };
                QBListArray.push(QBListObj);
            });

            return {
                collection: QBListArray,
                rowsPerPage: 10,
                showFilter: true,
                showRowCount: true,
                fields: [
                    { 'key': 'id', label: 'id', sortable: false, hidden: true },
                    { 'key': 'createdAt', label: 'createdAt', hidden: true, sortable: false, sortOrder: 0, sortDirection: 'descending' },
                    { 'key': 'sno', label: 'S.No', sortable: false },
                    { 'key': 'question', label: 'Question', sortable: false },
                    { 'key': 'edit', label: 'Edit', tmpl: Template.editQuestion },
                    { 'key': 'delete', label: 'Delete', tmpl: Template.deleteQuestion }
                ]
            };
        }
    }
});