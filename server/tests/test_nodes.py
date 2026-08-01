from app.graph.nodes import Extracted, apply_field_updates


def test_apply_field_updates_returns_only_mentioned_fields():
    extracted = Extracted(intent="intake", budget="10 000 PLN")

    assert apply_field_updates(extracted) == {"budget": "10 000 PLN"}


def test_apply_field_updates_allows_overwrite_values():
    extracted = Extracted(
        intent="intake",
        project_type="AI / automatyzacja",
        budget="15 000 PLN",
    )

    assert apply_field_updates(extracted) == {
        "project_type": "AI / automatyzacja",
        "budget": "15 000 PLN",
    }
