import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Users, 
  ShoppingBag, 
  UserCog, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck,
  ShieldCheck,
  Ban,
  Search
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Redirect } from "wouter";
import { type User, type Order } from "@shared/schema";

export default function Admin() {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!currentUser && currentUser.role === "admin"
  });

  const { data: orders, isLoading: loadingOrders } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
    enabled: !!currentUser && currentUser.role === "admin"
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${id}/role`, { role });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Role updated successfully" });
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User status updated" });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User removed" });
    }
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/orders/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({ title: "Order status updated" });
    }
  });

  if (!currentUser || currentUser.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-6 max-w-[100rem] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Command Center</h1>
          <p className="text-muted-foreground mt-2">Manage the Air Matters ecosystem and its citizens.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border flex items-center gap-4">
            <Users className="w-10 h-10 text-primary opacity-20" />
            <div>
              <div className="text-2xl font-bold">{users?.length || 0}</div>
              <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Total Users</div>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border flex items-center gap-4">
            <ShoppingBag className="w-10 h-10 text-primary opacity-20" />
            <div>
              <div className="text-2xl font-bold">{orders?.length || 0}</div>
              <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Total Orders</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-8">
        <TabsList className="bg-card/40 backdrop-blur-md border border-border p-1 rounded-2xl h-auto">
          <TabsTrigger value="users" className="rounded-xl px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" /> User Management
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-xl px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
            <ShoppingBag className="w-4 h-4 mr-2" /> Order Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-[2rem] overflow-hidden shadow-2xl">
            <Table>
              <TableHeader className="bg-background/40">
                <TableRow>
                  <TableHead>User Information</TableHead>
                  <TableHead>Account Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((u) => (
                  <TableRow key={u.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell>
                      <div className="font-bold text-foreground">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "default" : "secondary"} className="rounded-full px-3">
                        {u.role === "admin" ? <ShieldCheck className="w-3 h-3 mr-1" /> : null}
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.status === "active" ? "outline" : "destructive"} className="rounded-full px-3">
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="rounded-lg h-9 w-9 p-0"
                          onClick={() => updateRoleMutation.mutate({ id: u.id, role: u.role === "admin" ? "user" : "admin" })}
                          title="Toggle Admin"
                        >
                          <UserCog className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="rounded-lg h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => updateStatusMutation.mutate({ id: u.id, status: u.status === "active" ? "blocked" : "active" })}
                          title={u.status === "active" ? "Block" : "Unblock"}
                        >
                          {u.status === "active" ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="rounded-lg h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => {
                             if(confirm(`Are you sure you want to permanently delete ${u.name}?`)) {
                               deleteUserMutation.mutate(u.id);
                             }
                          }}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-[2rem] overflow-hidden shadow-2xl">
            <Table>
              <TableHeader className="bg-background/40">
                <TableRow>
                  <TableHead>Order Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead className="text-right">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((o) => (
                  <TableRow key={o.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell>
                      <div className="font-bold text-foreground">{o.productName}</div>
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">{o.id}</div>
                    </TableCell>
                    <TableCell className="font-mono font-bold text-primary">{o.amount}</TableCell>
                    <TableCell>
                      <Badge className="rounded-full px-3">
                        {o.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                        {o.status === "shipped" && <Truck className="w-3 h-3 mr-1" />}
                        {o.status === "delivered" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full text-[10px] h-8 px-3"
                          onClick={() => updateOrderStatusMutation.mutate({ id: o.id, status: "shipped" })}
                        >
                          Ship
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full text-[10px] h-8 px-3"
                          onClick={() => updateOrderStatusMutation.mutate({ id: o.id, status: "delivered" })}
                        >
                          Deliver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
