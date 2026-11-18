import pytest
from pydantic import ValidationError

from app.schemas.analysis import ActionItem, DocumentAnalysis


def test_document_analysis_accepts_valid_data():
    data = {
        "summary": "The document describes a project.",
        "key_points": ["The project starts in January."],
        "action_items": [
            {
                "task": "Prepare the project plan",
                "responsible_person": "John",
                "deadline": "2026-12-01"
            }
        ],
        "decisions": ["The project was approved."]
    }

    analysis = DocumentAnalysis.model_validate(data)

    assert analysis.summary == "The document describes a project."
    assert len(analysis.key_points) == 1
    assert len(analysis.action_items) == 1


def test_action_item_allows_missing_optional_fields():
    action = ActionItem(task="Prepare the report")

    assert action.responsible_person is None
    assert action.deadline is None


def test_document_analysis_requires_summary():
    data = {
        "key_points": [],
        "action_items": [],
        "decisions": []
    }

    with pytest.raises(ValidationError):
        DocumentAnalysis.model_validate(data)


def test_document_analysis_rejects_invalid_key_points():
    data = {
        "summary": "A document summary.",
        "key_points": "This should be a list.",
        "action_items": [],
        "decisions": []
    }

    with pytest.raises(ValidationError):
        DocumentAnalysis.model_validate(data)