// pages/ChecklistBoard.jsx
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Tag, Input, message, Modal, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  getChecklist,
  createChecklist,
  deleteChecklist,
  deleteChecklistItem,
  updateChecklistItemStatus,
  createChecklistItem,
  updateChecklistItemName,
} from "../../service/ChecklistBoard";
import MainLayout from "../Layout/MainLayout";

const colors = ["#ffd666", "#bae7ff", "#ffccc7", "#d9f7be", "#e6f7ff"];

const ChecklistBoard = () => {
  const [checklists, setChecklists] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getChecklist();
      if (res && res.data) {
        setChecklists(
          res.data.map((cl, index) => ({
            id: cl.id,
            title: cl.name,
            items: cl.items || [],
            color: colors[index % colors.length],
          }))
        );
      }
    } catch (error) {
      message.error("Gagal memuat checklist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  if (selectedChecklist) {
    const updatedChecklist = checklists.find(c => c.id === selectedChecklist.id);
    if (updatedChecklist) {
      setSelectedChecklist(updatedChecklist);
    }
  }
}, [checklists]);


  const addChecklist = async () => {
    if (!newTitle.trim()) return;
    try {
      await createChecklist(newTitle);
      message.success("Checklist berhasil ditambahkan");
      setNewTitle("");
      fetchData();
    } catch (error) {
      message.error("Gagal menambahkan checklist");
    }
  };

  const handleDeleteChecklist = async (checklistId) => {
    try {
      await deleteChecklist(checklistId);
      message.success("Checklist dihapus");
      fetchData();
    } catch {
      message.error("Gagal hapus checklist");
    }
  };

  const handleDeleteItem = async (checklistId, itemId) => {
    try {
      await deleteChecklistItem(checklistId, itemId);
      fetchData();
    } catch {
      message.error("Gagal hapus item");
    }
  };

  const handleToggleStatus = async (checklistId, itemId, status) => {
    try {
      await updateChecklistItemStatus(checklistId, itemId, status);
      fetchData();
    } catch {
      message.error("Gagal update status item");
    }
  };

  const handleAddItem = async () => {
    if (!newItemTitle.trim() || !selectedChecklist) return;
    try {
      await createChecklistItem(selectedChecklist.id, newItemTitle);
      message.success("Item berhasil ditambahkan");
      setNewItemTitle("");
      fetchData();
    } catch {
      message.error("Gagal menambahkan item");
    }
  };

  const handleRenameItem = async (checklistId, itemId) => {
    if (!editingValue.trim()) return;
    try {
      await updateChecklistItemName(checklistId, itemId, editingValue.trim());
      message.success("Item berhasil diubah");
      setEditingItem(null);
      setEditingValue("");
      fetchData();
    } catch {
      message.error("Gagal mengubah item");
    }
  };

  const openDetailModal = (checklist) => {
    setSelectedChecklist(checklist);
    setModalVisible(true);
  };

  return (
    <MainLayout pageTitle="Checklist Board">
      <div style={{ padding: 24 }}>
        <h1 style={{ marginBottom: 20 }}>Checklist Board</h1>

        {/* Form tambah checklist */}
        <div style={{ display: "flex", marginBottom: 20, gap: 8 }}>
          <Input
            placeholder="Tambah checklist baru..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addChecklist}
            loading={loading}
          >
            Tambah
          </Button>
        </div>

        {/* Grid checklist */}
        <Row gutter={[16, 16]}>
          {checklists.map((checklist) => (
            <Col xs={24} sm={12} md={8} lg={8} key={checklist.id}>
              <Card
                style={{
                  backgroundColor: checklist.color,
                  borderRadius: 8,
                  minHeight: 200,
                }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
                title={<Tag color="blue">{checklist.title}</Tag>}
                extra={
                  <Button
                    danger
                    size="small"
                    onClick={() => handleDeleteChecklist(checklist.id)}
                  >
                    Hapus
                  </Button>
                }
              >
                <Button
                  icon={<EyeOutlined />}
                  type="primary"
                  onClick={() => openDetailModal(checklist)}
                >
                  Detail
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal detail checklist */}
        <Modal
          title={selectedChecklist?.title}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={600}
        >
          {/* Form tambah item */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <Input
              size="small"
              placeholder="Tambah item..."
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
            <Button
              size="small"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddItem}
            />
          </div>

          {/* Daftar item */}
          <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
            {selectedChecklist?.items?.length > 0 ? (
              selectedChecklist.items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={item.itemCompletionStatus}
                      onChange={(e) =>
                        handleToggleStatus(
                          selectedChecklist.id,
                          item.id,
                          e.target.checked
                        )
                      }
                    />
                    {editingItem?.itemId === item.id ? (
                      <Input
                        size="small"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                    ) : (
                      <span
                        style={{
                          textDecoration: item.itemCompletionStatus
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 4 }}>
                    {editingItem?.itemId === item.id ? (
                      <>
                        <Tooltip title="Simpan">
                          <Button
                            type="primary"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              handleRenameItem(selectedChecklist.id, item.id)
                            }
                          />
                        </Tooltip>
                        <Tooltip title="Batal">
                          <Button
                            size="small"
                            onClick={() => {
                              setEditingItem(null);
                              setEditingValue("");
                            }}
                          >
                            ✕
                          </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => {
                              setEditingItem({
                                checklistId: selectedChecklist.id,
                                itemId: item.id,
                              });
                              setEditingValue(item.name);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Hapus">
                          <Button
                            icon={<DeleteOutlined />}
                            danger
                            size="small"
                            onClick={() =>
                              handleDeleteItem(selectedChecklist.id, item.id)
                            }
                          />
                        </Tooltip>
                      </>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li style={{ fontStyle: "italic", color: "#888" }}>
                (Belum ada item)
              </li>
            )}
          </ul>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default ChecklistBoard;
