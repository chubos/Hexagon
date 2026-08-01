def test_health(client):
    assert client.get("/health").json() == {"status": "ok"}


def test_chat(client):
    response = client.post("/chat", json={"session_id": "s1", "message": "Cześć"})

    assert response.status_code == 200
    assert response.json()["reply"] == "Witaj!"
    assert response.json()["done"] is False


def test_chat_rejects_invalid_body(client):
    response = client.post("/chat", json={"session_id": "", "message": "Hej"})

    assert response.status_code == 422
