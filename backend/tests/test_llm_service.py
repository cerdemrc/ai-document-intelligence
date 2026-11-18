import pytest

from app.services.llm_service import analyze_document

@pytest.mark.asyncio
async def test_llm_does_not_invent_missing_information():
    document_text = """
    Meeting Notes

    The team discussed the upcoming project.
    No final decisions were made.
    No deadlines or responsible persons were assigned.
    """

    analysis = await analyze_document(document_text)

    assert analysis.summary
    assert analysis.action_items == []
    assert analysis.decisions == []