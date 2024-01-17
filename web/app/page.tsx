'use client'

import { Box, Container, Flex, Icon, Spacer, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import getItems, { Item } from '@/app/history_service'
import ItemModal from '@/app/modal'
import { useEffect, useState } from 'react'
import { BellIcon } from '@chakra-ui/icons'

export default function Page() {
  var key = 0
  const [items, setItems] = useState(Array<Item>);
  const [pulling, setPulling] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      if(pulling) {
        var res = await getItems();
        setItems(res);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [pulling]);

  return (
    <Container mt="2" maxW='container.xl'>
      <Flex>
        <Box p='4'>
          <Icon as={BellIcon} mr='2' />Catcher
        </Box>
        <Spacer />
        <Box p='4'>
          Pulling <Switch id='email-alerts' isChecked={pulling} onChange={() => {setPulling(!pulling)}} />
        </Box>
      </Flex>
      <TableContainer>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th width="1%" whiteSpace='nowrap'>ID</Th>
              <Th width="1%" whiteSpace='nowrap'>Method</Th>
              <Th >Address</Th>
              <Th width="1%" whiteSpace='nowrap'></Th>
              <Th width="1%" isNumeric>Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item: Item) => {
              key = key + 1
              return (
                <Tr key={key}>
                  <Td>{item.id}</Td>
                  <Td>{item.method}</Td>
                  <Td>{item.address}</Td>
                  <Td>{ item.body && <ItemModal text={item.body}></ItemModal> }</Td>
                  <Td isNumeric>{item.created_at}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}
